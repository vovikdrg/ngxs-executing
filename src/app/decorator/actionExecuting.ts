import { Injectable } from "@angular/core";
import { Actions, ActionType, getActionTypeFromInstance } from "@ngxs/store";
import { filter, map, tap } from "rxjs/operators";
import { ActionContext, ActionStatus } from "@ngxs/store/src/actions-stream";

@Injectable({ providedIn: "root" })
export class ActionFactoryFactory {
  static actions: Actions | undefined = undefined;

  constructor(actions: Actions) {
    ActionFactoryFactory.actions = actions;
  }
}

export function ActionExecuting(actions: ActionType | ActionType[]) {
  return function(target: any, name: string) {
    const selectorFnName = "__" + name + "__action_executing$";
    const propertyActionState = "__" + name + "__actions_state";
    const createObs = self => {
      const allowedTypes = (Array.isArray(actions)
        ? actions
        : [actions]
      ).reduce((filterMap: Map<string, boolean>, klass: any) => {
        filterMap[getActionTypeFromInstance(klass)!] = true;
        return filterMap;
      }, new Map<string, boolean>());

      return ActionFactoryFactory.actions.pipe(
        filter((ctx: ActionContext) => {
          return allowedTypes[getActionTypeFromInstance(ctx.action)];
        }),
        tap(c => {
          return (self[propertyActionState][
            getActionTypeFromInstance(c.action)
          ] = c.status);
        }),
        map(
          c =>
            !!Object.values(self[propertyActionState]).find(
              ac => ac === ActionStatus.Dispatched
            )
        )
      );
    };
    if (delete target[name]) {
      Object.defineProperty(target, selectorFnName, {
        writable: true,
        enumerable: false,
        configurable: true
      });
      //Property to keep state of watched states
      Object.defineProperty(target, propertyActionState, {
        writable: true,
        enumerable: false,
        configurable: true,
        value: {}
      });
      Object.defineProperty(target, name, {
        get: function() {
          return (
            this[selectorFnName] ||
            (this[selectorFnName] = createObs.apply(null, [this]))
          );
        },
        enumerable: true,
        configurable: true
      });
    }
  };
}
