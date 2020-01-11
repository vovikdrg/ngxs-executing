import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { FeedAnimals, CountAnimals, ZooState } from "./state/state";
import { ActionExecuting } from "./decorator/actionExecuting";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "ngxs-executing";

  @ActionExecuting([FeedAnimals, CountAnimals])
  zooInProgress$: Observable<boolean>;

  @Select(ZooState) zoo$: Observable<ZooState>;

  constructor(private store: Store) {}

  dispatchEvents() {
    this.store.dispatch([new FeedAnimals(), new CountAnimals()]);
  }
}
