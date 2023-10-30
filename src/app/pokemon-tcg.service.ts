import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  public remoteData: BehaviorSubject<any[]>;
  private apiCardsUrl: string = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) {
    this.remoteData = new BehaviorSubject([]) as any;
  }

  getCards(nameSearch: string): Observable<any> {
    let params = '?orderBy=name&q=name:"*' + nameSearch + '*"';
    return this.http.get(`${this.apiCardsUrl + params}`);
  }
}
