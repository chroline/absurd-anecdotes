import MadLibsAPIResponse from "~core/util/types/MadLibsAPIResponse";

export default class MadLibsAPICtrl {
  private static _instance: MadLibsAPICtrl;

  static get I() {
    if (!this._instance) this._instance = new MadLibsAPICtrl();

    return this._instance;
  }

  async fetchRandomStory() {
    return (await (await fetch("https://madlibs-api.vercel.app/api/random")).json()) as MadLibsAPIResponse;
  }

  async fetchStory(title: string) {
    return (await (await fetch("https://madlibs-api.vercel.app/api/story/" + title)).json()) as MadLibsAPIResponse;
  }
}
