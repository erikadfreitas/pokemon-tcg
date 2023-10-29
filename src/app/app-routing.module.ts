import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DecksComponent} from "./decks/decks.component";
import {CardsComponent} from "./cards/cards.component";
import {CreateComponent} from "./decks/create/create.component";
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [
  { path: 'decks', component: DecksComponent },
  { path: 'decks/create', component: CreateComponent },
  { path: 'cards', component: CardsComponent },
  { path: '', redirectTo: '/decks', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
