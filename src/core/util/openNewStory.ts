import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import GameDataCtrl from "~core/ctrl/GameDataCtrl";
import { RootStackParamList } from "~core/navigation/types";

export default async function openNewStory(
  saveDate: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
  replace: boolean = false
) {
  const { blanks } = await GameDataCtrl.I.loadNewGame(saveDate);
  if (replace) {
    navigation.replace("Fields", { blanks, saveDate });
  } else {
    navigation.push("Fields", { blanks, saveDate });
  }
}
