import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { HttpService} from '../http.service';
import { CartService } from '../cart/cart.service';

import {GoodItem} from '../goodItem';

class Slide {
  url: string;
  title: string;
  alt: string;
  description: string;
}

@Component({
  selector: 'app-wings',
  templateUrl: './wings.component.html',
  styleUrls: ['./wings.component.css'],
  providers: [HttpService]
})
export class WingsComponent implements OnInit {
  slides = SLIDES;
  wings: GoodItem[] = [];
  constructor(private httpService: HttpService, private cartService: CartService) { }

  setGood(id, name, price): void {
    let quantity = this.cartService.countGoodItem(id);
    this.cartService.addGoodItem(id, name, price, quantity);
    this.cartService.announceCartCount('товар добавлен в корзину');
  }

  ngOnInit() {
    this.httpService.getData('/assets/data/wings.json').subscribe(data => this.wings=data['wingList']);
  }

}

export const SLIDES: Slide[] = [
  {
    url: '/assets/images/bike-with-wing.png',
    title: 'Kharkov subway',
    alt: 'Kharkov subway',
    description: 'Ticket and card vending machines in Kharkov underground station'
  },
  {
    url: '/assets/images/bike-with-case.png',
    title: 'Baku subway',
    alt: 'Baku subway',
    description: 'Card vending machines and turnstiles in Baku underground station'
  }
];

