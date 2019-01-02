import {Component} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { HttpClient} from '@angular/common/http';
import { HttpService} from './app/http.service';
import { CartService } from './app/cart/cart.service';
import {User} from './app/user';

import {GoodItem} from './app/goodItem';

import * as $ from 'jquery';
import * as _ from 'underscore';


@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: '/modal-basic.html',
  styleUrls: ['./modal-basic.css'],
  providers: [HttpService, CartService]
})
export class NgbdModalBasic {
    done: boolean = false;
    user: User = new User(); // данные вводимого пользователя
    receivedUser: User; // полученный пользователь
    delivery: string;

  closeResult: string;

//   name: string;
//   email;
//   phone: string;

  total: number;
  ui;
  freeDelivery;

  constructor(private modalService: NgbModal, private httpService: HttpService, private cartService: CartService) {}

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
      return  `with: ${reason}`;
    }
  }
// -------------------------------------------------------------------------
    
    // submit(name, email, phone, address, message, delivery) {
    //   this.user.name = name;
    //   this.user.email = email;
    //   this.user.phone = phone;
    //   this.user.address = address;
    //   this.user.message = message;
    //     console.log('submit method is started');
    //     console.log('user', this.user);
    //     this.httpService.postData('/assets/scripts/order.php', this.user)
    //         .subscribe(
    //             (data: User) => { this.receivedUser = data; this.done = true; },
    //             error => console.log(error)
    //         );
    //         console.log('this.receivedUser', this.receivedUser);    
    // }

    submit(user: User, delivery) {
      this.user = user;
      this.delivery = delivery;
        console.log('submit method is started');
        console.log('user', this.user);
        console.log('delivery', this.delivery);
        this.httpService.postData('/assets/scripts/order.php', this.user)
            .subscribe(
                (data: User) => { this.receivedUser = data; this.done = true; },
                error => console.log(error)
            );
            console.log('this.receivedUser', this.receivedUser);    
    }


// ----------------------------------------------------------------------------

ngOnInit() {






    // console.log('init is started');

    this.ui = {
        $orderForm: $('#order-form'),
        $messageCart: $('#order-message'),
        $orderBtn: $('#order-btn'),
        $alertValidation: $('#alert-validation'),
        $alertOrderDone: $('#alert-order-done'),
        $orderMessageTemplate: $('#order-message-template'),
        $fullSumma: $('#full-summa'),
        $delivery: {
            type: $('#delivery-type'),
            summa: $('#delivery-summa'),
            btn: $('.js-delivery-type'),
            alert: $('#alert-delivery')
        }
    };
  
    // this.freeDelivery = {
    //     enabled: false,
    //     summa: 1000
    // };




    // this._renderMessage();
    // this._checkCart();
    // this._initDelivery();

    // this._bindHandlers();


}



// Модуль корзины


  

  // Рендерим сообщение о количестве товаров и общей сумме
//    _renderMessage() {
//       let template = _.template(this.ui.$orderMessageTemplate.html()),
//           data;
//       cart.update();
//       data = {
//           count: cart.getCountAll(),
//           summa: cart.getSumma()
//       };
//       this.ui.$messageCart.html(template(data));
//   }

  // В случае пустой корзины отключаем кнопку Отправки заказа
//   _checkCart() {
//       if (cart.getCountAll() === 0) {
//           this.ui.$orderBtn.attr('disabled', 'disabled');
//       }
//   }

  // Меняем способ доставки
//   _changeDelivery() {
//       var $item = this.ui.$delivery.btn.filter(':checked'),
//           deliveryType = $item.attr('data-type'),
//           deliverySumma = this.freeDelivery.enabled ? 0 : +$item.attr('data-summa'),
//           cartSumma = cart.getSumma(),
//           fullSumma = deliverySumma + cartSumma,
//           alert =
//               this.freeDelivery.enabled
//                   ? 'Мы дарим Вам бесплатную доставку!'
//                   :
//                           // 'Сумма доставки ' + deliverySumma + ' гривен. ' +
//                       'Общая сумма заказа: '+
//                       // cartSumma + ' + ' + deliverySumma + 
//                       ' = ' + fullSumma + ' гривен';

//       this.ui.$delivery.type.val(deliveryType);
//       this.ui.$delivery.summa.val(deliverySumma);
//       this.ui.$fullSumma.val(fullSumma);
//       this.ui.$delivery.alert.html(alert);
//   }

  // Инициализация доставки
//   _initDelivery() {
//       Устанавливаем опцию бесплатной доставки
//       this.freeDelivery.enabled = (cart.getSumma() >= this.freeDelivery.summa);

//       Навешиваем событие на смену способа доставки
//      this.ui.$delivery.btn.on('change', this._changeDelivery);

//       this._changeDelivery();
//   }

  // Навешиваем события
//   _bindHandlers() {
//       console.log('_bindHandlers is started');
//       this.ui.$orderForm.on('click', '.js-close-alert', this._closeAlert);
//       this.ui.$orderForm.on('submit', this._onSubmitForm);
//       console.log('this.ui.$orderForm', this.ui.$orderForm);
//   }

  // Закрытие alert-а
  _closeAlert(e) {
      $(e.target).parent().addClass('d-none');
  }

  // Валидация формы
  _validate() {
      console.log('_validate() is started');
      let name = this.user.name,
          email = this.user.email,
          isValid = (name !== '') && (email !== '');
          console.log('_validate() is finished');
      return isValid;
      
  }

  // Подготовка данных корзины к отправке заказа
  _getCartData() {
      console.log('_getCartData() is started');
    let cartData = [];
    let length = localStorage.length;
    for (let i = 0; i < length; i++) {
      let id = localStorage.key(i);
      if(parseInt(id.substring(0, 3), 10) === 100) {
        var currentGoodItem = JSON.parse(localStorage.getItem(id));
        currentGoodItem.sum = currentGoodItem.price * currentGoodItem.quantity;
        this.total += currentGoodItem.sum;
        cartData.push(currentGoodItem);
      }
    }
      _.each(cartData, function(item) {
          item.name = encodeURIComponent(item.name);
      });
      console.log('cartData', cartData);
      return cartData;
  }

  // Успешная отправка
  _orderSuccess(responce) {
      console.info('responce', responce);
      this.ui.$orderForm[0].reset();
      this.ui.$alertOrderDone.removeClass('d-none');
  }

  // Ошибка отправки
  _orderError(responce) {
      console.error('responce', responce);
    //   Далее обработка ошибки, зависит от фантазии
  }

  // Отправка завершилась
  _orderComplete() {
      this.ui.$orderBtn.removeAttr('disabled').text('Отправить заказ');
  }

  // Оформляем заказ
  submit1() {
    console.log('0');
      let isValid,
          formData,
          cartData,
          orderData;
    //   event.preventDefault();
      console.log('1');
    //   this.ui.$alertValidation.addClass('d-none');
      isValid = this._validate();
      if (!isValid) {
        //   this.ui.$alertValidation.removeClass('d-none');
          return false;
      }
      console.log('2');
    //   formData = this.ui.$orderForm.serialize();
    //   console.log('formData', formData);
      cartData = this._getCartData();
      orderData = formData + '&cart=' + JSON.stringify(cartData);
    //   this.ui.$orderBtn.attr('disabled', 'disabled').text('Идет отправка заказа...');
      console.log('3');
      $.ajax({
          url: '/assets/scripts/order.php',
          data: orderData,
          type: 'POST',
          cache: false,
          dataType: 'json',
          error:this._orderError,
          success: function(responce) {
              if (responce.code === 'success') {
                  this._orderSuccess(responce);
              } else {
                  this._orderError(responce);
              }
          },
          complete: this._orderComplete
      });
      console.log('4');
  }

// ---------------------------------------------------------------------------
}

