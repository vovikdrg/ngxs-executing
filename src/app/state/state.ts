import { State, Action, StateContext } from "@ngxs/store";
import { timer } from "rxjs";
import { take, tap } from "rxjs/operators";

export class FeedAnimals {
  static readonly type = "[Zoo] FeedAnimals";
}

export class CountAnimals {
  static readonly type = "[Zoo] CountAnimals";
}

export interface ZooStateModel {
  feed: boolean;
  count: number;
}

@State<ZooStateModel>({
  name: "zoo",
  defaults: {
    feed: false,
    count: 0
  }
})
export class ZooState {
  @Action(FeedAnimals)
  feedAnimals(ctx: StateContext<ZooStateModel>) {
    return timer(2000).pipe(
      tap(t => {
        throw "Not sure what is the problem :)";
      })
    );
  }

  @Action(CountAnimals)
  countAnimals(ctx: StateContext<ZooStateModel>) {
    return timer(5000).pipe(
      tap(v => {
        ctx.patchState({ count: Math.random() });
      })
    );
  }
}
