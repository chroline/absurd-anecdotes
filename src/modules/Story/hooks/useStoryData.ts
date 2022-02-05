import { useEffect, useState } from "react";
import ErrorCtrl from "~core/ctrl/ErrorCtrl";
import GameDataCtrl from "~core/ctrl/GameDataCtrl";
import MadLibsAPICtrl from "~core/ctrl/MadLibsAPICtrl";

export default function useStoryData(saveDate: string) {
  const [title, setTitle] = useState("");
  const [blanks, setBlanks] = useState<string[]>([]);
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    GameDataCtrl.I.retrieveTitle(saveDate).then((v) => setTitle(v || ""));
    GameDataCtrl.I.retrieveBlanks(saveDate).then((v) =>
      setBlanks((v || []) as string[])
    );
  }, []);

  useEffect(() => {
    if (title === "") return;

    MadLibsAPICtrl.I.fetchStory(title)
      .then((v) => {
        setText((v.text || []) as string[]);
      })
      .catch((e) =>
        ErrorCtrl.I.stream.next([
          "An error occurred while retrieving the story!",
          e,
        ])
      );
  }, [title, blanks]);

  return { title, blanks, text };
}
