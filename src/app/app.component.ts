import { Component } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { CartService } from './cart/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ie: number;
  totalGoodsCount: string;
  cartMessage: string;

  constructor(private cartService: CartService) {
    cartService.cartCountChange$.subscribe(
      cartEvent => {
        this.totalGoodsCount = JSON.parse(localStorage.getItem("totalGoodsCount"));
        this.cartMessage = cartEvent;
        setTimeout(() => this.cartMessage = null, 1000);
      }
    );
  }

  ngOnInit() {
    if (navigator.userAgent.indexOf('MSIE') != -1) this.ie = 1;
    else this.ie = 0;
    document.onmousedown = (e) => {
      event = e || window.event;
      if ((this.ie && e.button == 4) || (!this.ie && e.button == 1)) return false
    }
    this.totalGoodsCount = JSON.parse(localStorage.getItem("totalGoodsCount")) || '0';
  }
}
