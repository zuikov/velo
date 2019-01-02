import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { HttpService} from '../http.service';
import { CartService } from '../cart/cart.service';

import {GoodItem} from '../goodItem';

class Photo {
  url: string;
  description?: string;
}

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css'],
  providers: [HttpService]
})
export class CasesComponent implements OnInit {
  photos = PHOTOS;
  cases: GoodItem[] =[];

  constructor(private httpService: HttpService, private cartService: CartService) { }

  setGood(id, name, price): void {
    let quantity = this.cartService.countGoodItem(id);
    this.cartService.addGoodItem(id, name, price, quantity);
    this.cartService.announceCartCount("товар добавлен в корзину");
  }

  ngOnInit() {
    this.httpService.getData('/assets/data/cases.json').subscribe(data => this.cases=data["caseList"]);
  }

}

export const PHOTOS: Photo[] = [
  {
    url: '/assets/images/case-for-bike-SCS-left.jpg',
    description: 'кейс - вид спереди'
  },
  {
    url: '/assets/images/case-for-bike-SCS-tiger-right.jpg',
    description: 'кейс - вид сбоку'
  },
  {
    url: '/assets/images/case-for-bike-SCS-red-reflective-tape.jpg',
    description: 'велокейс - вид сзади'
  },
  {
    url: '/assets/images/case-for-bike-SCS-red-reflective-tape-right.jpg',
    description: 'велокейс - вид сзади'
  },
  {
    url: '/assets/images/case-for-bike-SCS-tiger-left.jpg',
    description: 'велокейс - вид сбоку'
  },
  {
    url: '/assets/images/case-for-bike-SCS-right.jpg',
    description: 'велокейс - вид сзади'
  }
]

