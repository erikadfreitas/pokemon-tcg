import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {IgxGridComponent, IgxPaginatorComponent, IPaginatorResourceStrings} from 'igniteui-angular';
import {PokemonTcgService} from "../pokemon-tcg.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  // @ViewChild('grid1', { static: true }) public grid1: IgxGridComponent | undefined;
  // cards: any[] = [];
  // pageSize = 10;
  // currentPage = 1;
  // totalPages = 1;
  // totalCount = 1;

  @ViewChild('paginator', { read: IgxPaginatorComponent, static: false })
  paginator: IgxPaginatorComponent | undefined;

  public data: any[] = [];
  public isDropdownHidden = false;
  public isPagerHidden = false;
  public selectOptions = [5, 15, 20, 50];

  private paginatorResourceStrings: IPaginatorResourceStrings = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    igx_paginator_label: 'Records per page'
  };

  constructor(private pokemonService: PokemonTcgService) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards() {
    // console.log(this.currentPage)
    // this.pokemonService.getCards().subscribe(data => {
    //   this.data = data.data;
      // this.totalCount = data.totalCount;
      // this.totalPages = data.totalCount / this.pageSize;
    // });
  }

  // onPageChange(newPage: number) {
    // this.currentPage = newPage;
    // this.loadCards();
  // }
}
