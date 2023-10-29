import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonTcgService} from "../pokemon-tcg.service";
import {StoreService} from "../store.service";
import {Router} from "@angular/router";
import {IgxDialogComponent, IgxGridComponent, IgxToastComponent, VerticalAlignment} from "igniteui-angular";

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
  public decks: any = [];
  public deckData: any[] = [];
  public itemToDelete: any = null;

  @ViewChild('grid', {static: true}) public grid: IgxGridComponent | undefined;
  @ViewChild('dialog', {static: true}) dialog: IgxDialogComponent | undefined;
  @ViewChild('toastSubmitSuccess', {read: IgxToastComponent}) public toastSubmitSuccess: IgxToastComponent | any;

  constructor(private pokemonService: PokemonTcgService,
              private storeService: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getDecks();
  }

  getDecks(): void {
    this.decks = this.storeService.getAllDeckObjects();

    this.deckData = Object.keys(this.decks).map(key => {
      const deck = this.decks[key];
      const deckCardsFormatted = deck.deckCards.map((card: any) => {
        return `${card.name} (${card.hp ? card.hp : 'N/A'} - ${card.set.name})`;
      }).join('<br/>');

      return {
        deckKey: key,
        deckName: deck.deckName,
        deckCards: deckCardsFormatted
      };
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/decks/create']);
  }

  editItem(id: any): void {
    console.log(id)
  }

  openDeleteConfirmation(deck: any): void {
    this.itemToDelete = deck;
    this.dialog!.open();
  }

  deleteItem(): void {
    this.storeService.deleteDeck(this.itemToDelete.deckKey);
    this.toastSubmitSuccess.positionSettings.verticalDirection = VerticalAlignment.Middle;
    this.toastSubmitSuccess.open();
    this.dialog!.close();
    this.itemToDelete = null;
    this.getDecks();
  }

  showDetails(id: any): void {
    // Lógica para mostrar detalhes, com base no ID passado
  }


}
