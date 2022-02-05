import { useEffect, useState } from "react";

import { Snackbar } from "react-native-paper";
import { map } from "rxjs/operators";

import SnackbarMsgCtrl from "~core/ctrl/SnackbarMsgCtrl";
import theme from "~core/theme";
import SnackbarMsg from "~core/util/types/SnackbarMsg";

export function SnackbarMsgHandler() {
  const [snackbarMsgs, setSnackbarMsgs] = useState<(SnackbarMsg & { key: number; visible: boolean })[]>([]);
  const [i, setI] = useState(0);

  useEffect(() => {
    const $ = SnackbarMsgCtrl.I.stream.pipe(map(val => ({ ...val, key: i + 1, visible: true }))).subscribe(val => {
      setI(i + 1);
      setSnackbarMsgs(snackbarMsgs => [...snackbarMsgs, val]);
    });

    return () => $.unsubscribe();
  });

  return (
    <>
      {snackbarMsgs.map(snackbarMsg => (
        <Snackbar
          duration={2000}
          onDismiss={() => {
            setSnackbarMsgs(snackbarMsgs => {
              const i = snackbarMsgs.indexOf(snackbarMsg);
              snackbarMsgs[i].visible = false;
              return [...snackbarMsgs];
            });
          }}
          key={snackbarMsg.key}
          visible={snackbarMsg.visible}
          theme={theme}
          style={{
            backgroundColor: snackbarMsg.type ? (snackbarMsg.type === "error" ? "#ef4444" : "#10b981") : "#4b5563",
          }}
        >
          {snackbarMsg.text}
        </Snackbar>
      ))}
    </>
  );
}
