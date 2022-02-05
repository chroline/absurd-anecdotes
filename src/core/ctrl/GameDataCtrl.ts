import AsyncStorage from "@react-native-async-storage/async-storage";
import MadLibsAPICtrl from "~core/ctrl/MadLibsAPICtrl";

export default class GameDataCtrl {
  private static _instance: GameDataCtrl;

  static get I() {
    if (!this._instance) this._instance = new GameDataCtrl();

    return this._instance;
  }

  static get saveDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  async hasPlayed(saveDate: string) {
    const todayData = await this.retrieveBlanks(saveDate);
    return !!todayData;
  }

  async loadNewGame(saveDate: string) {
    const randomStory = await MadLibsAPICtrl.I.fetchRandomStory();
    await AsyncStorage.removeItem(`${saveDate}@blanks`);
    await AsyncStorage.setItem(`${saveDate}@title`, randomStory.title);
    return randomStory;
  }

  async saveBlanks(fields: string[], saveDate: string) {
    await AsyncStorage.setItem(`${saveDate}@blanks`, JSON.stringify(fields));
  }

  async retrieveTitle(saveDate: string) {
    return await AsyncStorage.getItem(`${saveDate}@title`);
  }

  async retrieveBlanks(saveDate: string) {
    return JSON.parse(
      (await AsyncStorage.getItem(`${saveDate}@blanks`)) as string
    ) as string[];
  }
}
