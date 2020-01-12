import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { AppComponent } from "./app.component";
import { ZooState } from "./state/state";
import { ActionExecutingFactory } from "./decorator/actionExecuting";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxsModule.forRoot([ZooState])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(actionFactoryFactory: ActionExecutingFactory) {}
}
