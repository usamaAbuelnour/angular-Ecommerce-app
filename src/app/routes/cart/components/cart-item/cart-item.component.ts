import { Component, inject, Input } from '@angular/core';
import { AddToCartService } from '../../../../shared/services/add-to-cart/add-to-cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() item!: any;
  numOfItems!: number;
  private addToCartService = inject(AddToCartService);
  ngOnInit() {
    this.addToCartService
      .getCartCount()
      .subscribe((data) => (this.numOfItems = data));
  }
  increaseQuantity() {
    this.addToCartService.setCartItems(this.item, 'cart', 'add');
  }
  decreaseQuantity() {
    this.addToCartService.setCartItems(this.item, 'cart', 'subtract');

  }

  removeItem() {
    this.addToCartService.removeItem(this.item.title)
  }
}
