import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  public remoteData: BehaviorSubject<any[]>;
  private apiCardsUrl = 'https://api.pokemontcg.io/v2/cards';
  private apiSupertypesUrl = 'https://api.pokemontcg.io/v2/supertypes';

  constructor(private http: HttpClient) {
    this.remoteData = new BehaviorSubject([]) as any;
  }

  // public getData(index?: number, perPage?: number): any {
  //   let qS = '';
  //
  //   if (perPage) {
  //     qS = `?$skip=${index}&pageSize=${perPage}&orderBy=name`;
  //   }
  //
  //   this.http
  //     .get(`${this.url + qS}`).pipe(
  //     map((data: any) => data)
  //   ).subscribe((data) => this.remoteData.next(data.data));
  // }
  //
  // public getDataLength(): any {
  //   return this.http.get(this.url).pipe(
  //     map((data: any) => data.totalCount)
  //   );
  // }

  getCards(nameSearch: string): Observable<any> {
      // ?orderBy=name
    let q = '?orderBy=name&q=name:"*' + nameSearch + '*"';
    return this.http.get(`${this.apiCardsUrl + q}`);
  }

  getSupertypes(): Observable<any> {
    return this.http.get(this.apiSupertypesUrl);
  }
}
