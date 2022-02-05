import SnackbarMsg from "~core/util/types/SnackbarMsg";

import { Subject } from "rxjs";

export default class SnackbarMsgCtrl {
  private static _instance: SnackbarMsgCtrl;

  static get I() {
    if (!this._instance) this._instance = new SnackbarMsgCtrl();

    return this._instance;
  }

  public stream = new Subject<SnackbarMsg>();
}
