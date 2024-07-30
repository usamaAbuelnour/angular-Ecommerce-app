import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  private numOfCartItems = new BehaviorSubject(0);
  private cartItems = new BehaviorSubject<Array<any>>([]);
  private totalPrice = new BehaviorSubject<number>(0);

  ngOnInit() {
    console.log('first');
  }

  getCartCount() {
    return this.numOfCartItems.asObservable();
  }
  setCartCount(value: number) {
    this.numOfCartItems.next(value);
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }

  setCartItems(value: any, sourceRoute: string, operation?: string) {
    const currentCart = this.cartItems.value;
    let updatedCart = [...currentCart];
    value.price = Number(value.price);

    const matchedItem = this.cartItems.value.find(
      (item) => item.title === value.title
    );

    if (matchedItem) {
      matchedItem.price = Number(matchedItem.price);
      if (operation === 'add') {
        matchedItem.quantity++;
        if (sourceRoute === 'home') {
          matchedItem.price += value.price;
        } else {
          matchedItem.price += value.price / (value.quantity - 1);
        }
      } else {
        if (matchedItem.quantity === 1) return;
        matchedItem.quantity--;
        matchedItem.price -= value.price / (value.quantity + 1);
      }
      matchedItem.price = matchedItem.price.toFixed(2);
    } else updatedCart = [...currentCart, value];

    this.cartItems.next(updatedCart);

    this.updateTotalItems();
    this.updateTotalPrice();
  }

  removeItem(title: string) {
    let updatedCart = this.cartItems.value.filter(
      (item) => item.title !== title
    );
    this.cartItems.next(updatedCart);
    this.updateTotalItems();
    this.updateTotalPrice();
  }

  getTotalPrice() {
    return this.totalPrice.asObservable();
  }

  private updateTotalItems() {
    let total;
    total = this.cartItems.value.length
      ? this.cartItems.value.reduce((sum, current) => ({
          quantity: sum.quantity + current.quantity,
        }))
      : { quantity: 0 };

    this.numOfCartItems.next(total.quantity);
  }

  private updateTotalPrice() {
    let total;
    total = this.cartItems.value.length
      ? this.cartItems.value.reduce((sum, current) => ({
          price: Number(sum.price) + Number(current.price),
        }))
      : { price: 0 };

    this.totalPrice.next(Number(total.price));
  }
}
