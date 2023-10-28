import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  IgxButtonDirective,
  IgxGridModule,
  IgxSelectComponent,
  IgxSelectItemComponent,
  IgxSwitchComponent,
  IgxIconModule,
  IgxInputGroupModule, IgxToastComponent, IgxToggleDirective, IgxSelectGroupComponent,
} from "igniteui-angular";
import {DecksComponent} from './decks/decks.component';
import {CardsComponent} from './cards/cards.component';
import {PokemonTcgService} from "./pokemon-tcg.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CreateComponent} from './decks/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    DecksComponent,
    CardsComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxGridModule,
    HttpClientModule,
    IgxButtonDirective,
    IgxSwitchComponent,
    FormsModule,
    IgxSelectComponent,
    IgxSelectItemComponent,
    IgxIconModule,
    IgxInputGroupModule,
    IgxToastComponent,
    IgxToggleDirective,
    IgxSelectGroupComponent
  ],
  providers: [
    PokemonTcgService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
