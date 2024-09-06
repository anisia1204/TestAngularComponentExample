import {ActionModel} from "./action.model";

export class ActionSorter {
  static sortActionsByDisabledState(actions: ActionModel[]) {
    const finalActions: ActionModel[] = []
    actions.forEach(action => {
      if(action.label === 'true') {
        if(!action.disabled) {
          finalActions.push(action)
          this.pushTheRestOfTheActions(actions, action.label)
        }
      }
      else {
        if(action.label === 'partial') {
          if(!action.disabled) {
            finalActions.push(action)
            this.pushTheRestOfTheActions(actions, action.label)
          }
        }
        else {
          if(action.label === 'false') {
            finalActions.push(action)
            this.pushTheRestOfTheActions(actions, action.label)
          }
        }
      }
    })
    finalActions.push(...actions)
    return finalActions;
  }

  private static pushTheRestOfTheActions(actions: ActionModel[], actionLabel: string) {
    const index = actions.findIndex(action => action.label === actionLabel);
    if (index !== -1) {
      actions
        .splice(index, 1)
    }
    actions.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
  }
}
