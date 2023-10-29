import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PokemonTcgService} from "../../pokemon-tcg.service";
import {IgxToastComponent, VerticalAlignment} from 'igniteui-angular';
import {StoreService} from "../../store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public cards: any[] = [];
  public supertypes: any[] = [];
  public deckName: string = '';
  public searchTermValue: string = '';
  public lastSearchTermValue: string = '';
  public selectedCards: any[] = [];
  public loading: boolean = false;
  public showImage: boolean = false;
  readonly MIN_NUMBER_OF_CARDS: number = 1;
  readonly MAX_NUMBER_OF_CARDS: number = 60;

  @ViewChild('toastMinLetters', {read: IgxToastComponent}) public toastMinLetters: IgxToastComponent | any;
  @ViewChild('toastNoCards', {read: IgxToastComponent}) public toastNoCards: IgxToastComponent | any;
  @ViewChild('toastMaxCardsWithTheSameName', {read: IgxToastComponent}) public toastMaxCardsWithTheSameName: IgxToastComponent | any;
  @ViewChild('toastSubmitSuccess', {read: IgxToastComponent}) public toastSubmitSuccess: IgxToastComponent | any;
  @ViewChild('toastSubmitWarning', {read: IgxToastComponent}) public toastSubmitWarning: IgxToastComponent | any;
  @ViewChild('imageOverlay') imageOverlay: ElementRef | any;
  @ViewChild('popupImage') popupImage: ElementRef | any;

  constructor(private pokemonService: PokemonTcgService,
              private storeService: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadSupertypes();
  }

  loadCards() {
    if (this.searchTermValue.length >= 3) {
      this.cards = [];
      this.loading = true;
      this.lastSearchTermValue = this.searchTermValue;

      this.pokemonService.getCards(this.searchTermValue).subscribe(data => {
        const newCards = data.data.filter((card: {
          id: any;
        }) => !this.selectedCards.some(selectedCard => selectedCard.id === card.id));
        this.cards.push(...newCards);
        if (data.data.length === 0) {
          this.toastNoCards.positionSettings.verticalDirection = VerticalAlignment.Middle;
          this.toastNoCards.open();
        }
        this.loading = false;
      });
    } else {
      this.toastMinLetters.positionSettings.verticalDirection = VerticalAlignment.Middle;
      this.toastMinLetters.open();
    }
  }

  loadSupertypes() {
    this.pokemonService.getSupertypes().subscribe(data => {
      this.supertypes = data.data;
    })
  }

  addToSelectedCards(card: any) {
    const nameCount = this.selectedCards.filter(selectedCard => selectedCard.name === card.name).length;

    if (nameCount === 4) {
      this.toastMaxCardsWithTheSameName.positionSettings.verticalDirection = VerticalAlignment.Middle;
      this.toastMaxCardsWithTheSameName.open('Carta não adicionada! Seu baralho já possui 4 cartas com o nome "' + card.name + '".');
    } else {
      this.selectedCards.push(card);
      this.selectedCards.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.cards = this.cards.filter(c => c !== card);
    }
  }

  removeFromSelectedCards(card: any) {
    this.selectedCards = this.selectedCards.filter(c => c !== card);
    if (card.name.toLowerCase().includes(this.lastSearchTermValue.toLowerCase())) {
      this.cards.push(card);
      this.cards.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
  }

  openImage(card: { images: { large: any; }; }) {
    this.showImage = true;
    const imageOverlay = this.imageOverlay.nativeElement;
    const popupImage = this.popupImage.nativeElement;
    popupImage.src = '';
    popupImage.src = card.images.large;
    imageOverlay.style.display = 'flex';
  }

  closeImage() {
    this.showImage = false;
    this.imageOverlay.nativeElement.style.display = 'none';
  }

  filteredCardsBySupertype(supertype: string): any[] {
    return this.cards.filter(card => card.supertype === supertype);
  }

  howManyCardsBySupertype(supertype: string): number {
    return this.cards.filter(card => card.supertype === supertype).length;
  }

  submit() {
    this.toastSubmitWarning.positionSettings.verticalDirection = VerticalAlignment.Middle;

    if (this.deckName === '') {
      this.toastSubmitWarning.open('Não é permitida a criação de baralhos sem nome!');
      return;
    }

    if (this.selectedCards.length < this.MIN_NUMBER_OF_CARDS) {
      this.toastSubmitWarning.open('Não é permitida a criação de baralhos com menos de ' + this.MIN_NUMBER_OF_CARDS + ' carta(s)!');
      return;
    }

    if (this.selectedCards.length > this.MAX_NUMBER_OF_CARDS) {
      this.toastSubmitWarning.open('Não é permitida a criação de baralhos com mais de ' + this.MAX_NUMBER_OF_CARDS + ' carta(s)!');
      return;
    }

    const data = {
      deckName: this.deckName,
      deckCards: this.selectedCards
    }

    this.storeService.createOrUpdateDeck(data);
    this.toastSubmitSuccess.positionSettings.verticalDirection = VerticalAlignment.Middle;
    this.toastSubmitSuccess.open();
    setTimeout(() => {
      this.router.navigate(['/decks']);
    }, 3000);
  }

  navigateToList() {
    this.router.navigate(['/decks']);
  }

}
