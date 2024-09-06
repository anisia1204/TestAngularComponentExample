import {ActionModel} from "./action.model";

export class ActionEnabler {
  static isEnabled(action: ActionModel, status1: boolean, status2: boolean) {
    switch (action.label) {
      case 'true':
        return this.isTrueEnabled(status1, status2)
      case 'partial':
        return this.isPartialEnabled(status1, status2)
      case 'false':
        return this.isFalseEnabled(status1, status2)
      default:
        return false;
    }
  }

  private static isTrueEnabled(status1: boolean, status2: boolean) {
    return status1 && status2;
  }

  private static isPartialEnabled(status1: boolean, status2: boolean) {
    return (status1 && !status2) || (!status1 && status2);
  }

  private static isFalseEnabled(status1: boolean, status2: boolean) {
    return !status1 && !status2;
  }
}
