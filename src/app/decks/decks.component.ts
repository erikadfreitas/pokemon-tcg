import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {StoreService} from "../store.service";
import {Router} from "@angular/router";
import {
  IgxDialogComponent,
  IgxGridComponent,
  IgxOverlayService,
  IgxToastComponent,
  VerticalAlignment
} from "igniteui-angular";

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
  public decks: any = [];
  public deckData: any[] = [];
  public deckToDelete: any = null;
  public deckToDetail: any = null;

  @ViewChild('grid', {static: true}) public grid: IgxGridComponent | undefined;
  @ViewChild('dialog', {static: true}) dialog: IgxDialogComponent | undefined;
  @ViewChild('toastSubmitSuccess', {read: IgxToastComponent}) public toastSubmitSuccess: IgxToastComponent | any;
  @ViewChild('overlayContent', { static: true }) overlayContent!: TemplateRef<any>;
  overlayId: string = '';

  constructor(private storeService: StoreService,
              private router: Router,
              private overlayService: IgxOverlayService,
              private viewContainerRef: ViewContainerRef) {
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
        deckCards: deck.deckCards,
        deckCardsFormatted: deckCardsFormatted
      };
    }).sort((a, b) => a.deckName.localeCompare(b.deckName));
  }

  navigateToCreate(): void {
    this.router.navigate(['/decks/create']);
  }

  editItem(deckKey: string): void {
    this.router.navigate(['/decks/edit', deckKey]);
  }

  openDeleteConfirmation(deck: any): void {
    this.deckToDelete = deck;
    this.dialog!.open();
  }

  deleteItem(): void {
    this.storeService.deleteDeck(this.deckToDelete.deckKey);
    this.toastSubmitSuccess.positionSettings.verticalDirection = VerticalAlignment.Middle;
    this.toastSubmitSuccess.open();
    this.dialog!.close();
    this.deckToDelete = null;
    this.getDecks();
  }

  showDetails(deck: any): void {
    this.deckToDetail = deck;
    this.openOverlay();
  }

  openOverlay(): void {
    const element = this.createOverlayElement();
    const elementRef = new ElementRef(element);
    this.overlayId = this.overlayService.attach(elementRef, {});
    this.overlayService.show(this.overlayId);
  }

  createOverlayElement(): HTMLElement {
    const element = document.createElement('div');
    const view = this.viewContainerRef.createEmbeddedView(this.overlayContent);
    element.appendChild(view.rootNodes[0]);

    return element;
  }

  closeOverlay(): void {
    if (this.overlayId) {
      this.overlayService.detach(this.overlayId);
      this.deckToDetail = null;
    }
  }

  howManyCardsBySupertype(deck: any, supertype: string): number {
    return deck.deckCards.filter((card: { supertype: string; }) => card.supertype === supertype).length;
  }

  howManyTypesInDeck(deck: any): any {
    const uniqueTypes = new Set();

    deck.deckCards.forEach((card: { types: any[]; }) => {
      if (card.types && Array.isArray(card.types)) {
        card.types.forEach(type => {
          uniqueTypes.add(type);
        });
      }
    });

    const uniqueTypesCount = uniqueTypes.size;
    const uniqueTypesList = Array.from(uniqueTypes).sort();

    if (uniqueTypesList.length === 0) {
      return 'Esse baralho não possui cores.'
    }

    if (uniqueTypesList.length > 1) {
      const lastType = uniqueTypesList.pop();
      const joinedTypes = uniqueTypesList.join(', ') + ' e ' + lastType;
      return 'Esse baralho possui ' + uniqueTypesCount + ' cores, que são: ' + joinedTypes;
    } else {
      return 'Esse baralho possui 1 cor: ' + uniqueTypesList[0];
    }
  }
}
