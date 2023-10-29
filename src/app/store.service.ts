import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  getNextDeckKey(): string {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('deck'));
    if (keys.length === 0) {
      return 'deck1';
    } else {
      const sortedKeys = keys.sort((a, b) => +b.replace('deck', '') - +a.replace('deck', ''));
      const lastKey = sortedKeys[0];
      const lastNumber = +lastKey.replace('deck', '');
      const nextNumber = lastNumber + 1;
      return 'deck' + nextNumber;
    }
  }

  createOrUpdateDeck(data: object): void {
    const nextDeckKey = this.getNextDeckKey();
    localStorage.setItem(nextDeckKey, JSON.stringify(data));
  }

  getAllDeckObjects(): object {
    const deckKeys = Object.keys(localStorage).filter(key => key.startsWith('deck'));
    const deckObjects: { [key: string]: any } = {};

    deckKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        deckObjects[key] = JSON.parse(value);
      }
    });

    return deckObjects;
  }

  deleteDeck(deckKey: string) {
    localStorage.removeItem(deckKey);
  }
}
