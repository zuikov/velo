// import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GoodItem } from '../goodItem';

@Injectable()
export class CartService {

  constructor() { }

  // searchEvent: EventEmitter = new EventEmitter();

  // Observable string sources
  private cartCountChangeSource = new Subject<string>();
  // Observable string streams
  cartCountChange$ = this.cartCountChangeSource.asObservable();
  // Service message commands
  announceCartCount(change: string) {
    this.cartCountChangeSource.next(change);
  }

  countGoodItem(id) {
    let isGoodItem = JSON.parse(localStorage.getItem(id));
    if (isGoodItem !== null) return isGoodItem.quantity + 1;
    return 1;
  }

  addGoodItem(id, name, price, quantity) {
    let currentItem = { id: id, name: name, price: price, quantity: quantity };
    let serialGoodItem = JSON.stringify(currentItem);
    localStorage.setItem(id, serialGoodItem);
    this.incrementTotalGoodsCount();
    // console.log('currentItem', currentItem);
    // console.log('serialGoodItem', serialGoodItem);
  }

  incrementTotalGoodsCount(){
    let totalGoodsCount = JSON.parse(localStorage.getItem("totalGoodsCount")) || '0';
    let intTotalGoodsCount = parseInt(totalGoodsCount, 10);
    intTotalGoodsCount += 1;
    localStorage.setItem("totalGoodsCount", intTotalGoodsCount.toString());
  }

  ngOnInit() {
    try {
      localStorage.setItem('ключ', 'значение');
    } catch (e) {
      if (e == 'QUOTA_EXCEEDED_ERR') {
        localStorage.clear();
      }
    }
  }
}
