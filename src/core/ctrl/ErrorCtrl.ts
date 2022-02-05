import SnackbarMsgCtrl from "~core/ctrl/SnackbarMsgCtrl";

import { Subject } from "rxjs";

export default class ErrorCtrl {
  private static _instance: ErrorCtrl;

  static get I() {
    if (!this._instance) this._instance = new ErrorCtrl();

    return this._instance;
  }

  public stream = new Subject<[string, Error]>();

  constructor() {
    this.stream.subscribe(([text, e]) => {
      SnackbarMsgCtrl.I.stream.next({
        text,
        type: "error",
      });
      // report errors here!
    });
  }
}
