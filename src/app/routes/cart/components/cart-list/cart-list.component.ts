import { Component, inject } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { AddToCartService } from '../../../../shared/services/add-to-cart/add-to-cart.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  cartItems!: any;
  totalPrice!: any;
  private addToCartService = inject(AddToCartService);
  ngOnInit(): void {
    this.addToCartService
      .getCartItems()
      .subscribe((data) => (this.cartItems = data));

    this.addToCartService
      .getTotalPrice()
      .subscribe((data) => (this.totalPrice = data.toFixed(2)));
  }
}
