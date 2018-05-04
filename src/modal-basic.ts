import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import { HttpService } from './app/http.service';
import { CartService } from './app/cart/cart.service';
import { User } from './app/user';

import { Subscription } from 'rxjs/Subscription';

import { GoodItem } from './app/goodItem';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: '/modal-basic.html',
  styleUrls: ['./modal-basic.css'],
  providers: [HttpService]
})


export class NgbdModalBasic {
  delivery: string = "Самовывоз";
  done: boolean = false;
  user: User = new User();
  orderDisabled: boolean = true;
  sendOrderDisabled: boolean = false;
  sendOrderValue: string = 'Отправить заказ';
  cartData = [];
  total: number;
  orderForm: {};
  dispatchMessage: string;
  closeResult: string;

  constructor(private modalService: NgbModal, private httpService: HttpService, private cartService: CartService) {
    cartService.cartCountChange$.subscribe(
      orderDisabled => {
        if (parseInt(JSON.parse(localStorage.getItem("totalGoodsCount")), 10) === 0) this.orderDisabled = true;
      }
    );
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // -------------------------------------------------------------------------
  submit(user: User, delivery) {
    let orderData;
    this.user = user;
    this.delivery = delivery;
    orderData = JSON.stringify(this.user) + '&cart=' + JSON.stringify(this.cartData);
    this.sendOrderDisabled = true;
    this.sendOrderValue = 'Идет отправка заказа...';
    this.httpService.postData('/assets/scripts/order.php', orderData)
      .subscribe(
        (data) => {
          orderData = data;
          this.done = true;
          this.sendOrderValue = 'Спасибо за заказ!';
          setTimeout(() => this.sendOrderValue = 'Скоро мы с Вами свяжемся', 5000);
          this.dispatchMessage = "Заказ успешно оправлен";
          setTimeout(() => this.dispatchMessage = null, 5000);
        },
        error => console.log(error)
      );
    this.sendOrderValue = 'Отправить заказ';
    this.cartService.announceclearCart("");
  }

  // ----------------------------------------------------------------------------
  ngOnInit() {
    if (parseInt(JSON.parse(localStorage.getItem("totalGoodsCount")), 10)) this.orderDisabled = false;

    // Подготовка данных корзины к отправке заказа
    let length = localStorage.length;
    for (let i = 0; i < length; i++) {
      let id = localStorage.key(i);
      if (parseInt(id.substring(0, 3), 10) === 100) {
        var currentGoodItem = JSON.parse(localStorage.getItem(id));
        currentGoodItem.sum = currentGoodItem.price * currentGoodItem.quantity;
        this.total += currentGoodItem.sum;
        this.cartData.push(currentGoodItem);
      }
    }
  }
}

