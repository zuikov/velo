import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CartService } from './cart.service';
import { GoodItem } from '../goodItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [HttpService]
})
export class CartComponent implements OnInit {
  goods = [];
  total: number = 0;

  constructor(private httpService: HttpService, private cartService: CartService) {
    cartService.clearCart$.subscribe(
      clearCart => {
        this.clearCart();
      }
    );
  }

  increment(id) {
    let currentGoodItem = JSON.parse(localStorage.getItem(id));
    currentGoodItem.quantity += 1;
    let serialGoodItem = JSON.stringify(currentGoodItem);
    localStorage.setItem(id, serialGoodItem);
    this.goods = [];
    this.total = 0;
    this.renderCart();
  }

  decrement(id) {
    let currentGoodItem = JSON.parse(localStorage.getItem(id));
    if (currentGoodItem.quantity > 0) currentGoodItem.quantity -= 1;
    let serialGoodItem = JSON.stringify(currentGoodItem);
    localStorage.setItem(id, serialGoodItem);
    if (currentGoodItem.quantity === 0) localStorage.removeItem(id);
    this.goods = [];
    this.total = 0;
    this.renderCart();
  }

  deleteGoodItem(id) {
    localStorage.removeItem(id);
    this.goods = [];
    this.total = 0;
    this.renderCart();
  }

  renderCart() {
    let length = localStorage.length;
    let totalGoodsCount = 0;
    for (let i = 0; i < length; i++) {
      let id = localStorage.key(i);
      if (parseInt(id.substring(0, 3), 10) === 100) {
        let currentGoodItem = JSON.parse(localStorage.getItem(id));
        currentGoodItem.sum = currentGoodItem.price * currentGoodItem.quantity;
        this.total += currentGoodItem.sum;
        this.goods.push(currentGoodItem);
        totalGoodsCount += currentGoodItem.quantity;
      }
    }
    localStorage.setItem("totalGoodsCount", totalGoodsCount.toString());
    this.cartService.announceCartCount("");
  }

  clearCart() {
    for (let i = 0; i < localStorage.length; i++) {
      let id = localStorage.key(i);
      if (parseInt(id.substring(0, 3), 10) === 100) {
        localStorage.removeItem(id);
        i -= 1;
      }
    }
    this.total = 0;
    this.goods = [];
    localStorage.setItem("totalGoodsCount", '0');
    this.cartService.announceCartCount("Товары из корзины перемещены в заказ");
  }

  ngOnInit() {
    this.renderCart();
  }

}

