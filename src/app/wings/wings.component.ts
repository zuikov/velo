import { Component, OnInit } from '@angular/core';

// import { Config, ConfigService } from '../config/config.service';

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
  wings: GoodItem[] =[];
    
  constructor(private httpService: HttpService, private cartService: CartService) { }

  // addGood(id): void {
  //   this.cartService.goods = this.cartService.addGood(id);
  //     console.log(this.cartService.goods);
  // }

  setGood(id, name, price): void {
    let quantity = this.cartService.countGoodItem(id);
    this.cartService.addGoodItem(id, name, price, quantity);
    this.cartService.announceCartCount("товар добавлен в корзину");
      // console.log(this.cartService.goods);
  }

  ngOnInit() {
    this.httpService.getData('/assets/data/wings.json').subscribe(data => this.wings=data["wingList"]);
    // console.log('this.wings', this.wings);
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
  // {
  //   url: '../../assets/images/hardware-projects/control-room-baku.jpg',
  //   title: 'Control room in Baku subway',
  //   alt: 'Control room in Baku subway',
  //   description: 'Station operator work place'
  // },
  // {
  //   url: '../../assets/images/hardware-projects/subway-erevan.jpg',
  //   title: 'Erevan subway',
  //   alt: 'Erevan subway',
  //   description: 'Turnstiles in Erevan underground station'
  // },
  // {
  //   url: '../../assets/images/hardware-projects/bus-ticket-validator.jpg',
  //   title: 'Bus fare collection system',
  //   alt: 'Bus fare collection system',
  //   description: 'Validator for bus passengers'
  // },
  // {
  //   url: '../../assets/images/hardware-projects/turnstiles-baku.jpg',
  //   title: 'Turnstiles with flaps',
  //   alt: 'Turnstiles with flaps',
  //   description: 'Turnstiles in Baku underground station'
  // },
]

