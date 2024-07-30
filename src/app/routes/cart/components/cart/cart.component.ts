import { Component, inject, OnInit } from '@angular/core';
import { CardListComponent } from '../../../home/components/card-list/card-list.component';
import { CartListComponent } from '../cart-list/cart-list.component';
import { AddToCartService } from '../../../../shared/services/add-to-cart/add-to-cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardListComponent, CartListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
 
}
