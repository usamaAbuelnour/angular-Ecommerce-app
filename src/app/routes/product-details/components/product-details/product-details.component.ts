import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../home/models/product';
import { NgClass } from '@angular/common';
import { DiscountPipe } from '../../../../shared/pipes/discount/discount.pipe';
import { AddToCartService } from '../../../../shared/services/add-to-cart/add-to-cart.service';
import { FetchProductsService } from '../../../../shared/services/fetch-products/fetch-products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgClass, DiscountPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  // products!: Array<any>;
  productId: any;
  targetProduct: any;
  price!: string;
  fraction!: string;
  ratingStars!: Array<undefined>;
  hasHalfStar!: boolean;
  numOfCartItems!: number;

  constructor(
    private fetchProductsService: FetchProductsService,
    private router: ActivatedRoute,
    private addToCartService: AddToCartService
  ) {
    this.productId = this.router.snapshot.params['id'];
  }
  ngOnInit() {
    this.fetchProductsService
      .getProductByID(this.productId)
      .subscribe((res) => {
        this.targetProduct = res;

        [this.price, this.fraction] = this.targetProduct.price
          .toString()
          .split('.');
      });

    this.addToCartService
      .getCartCount()
      .subscribe((data) => (this.numOfCartItems = data));
  }

  handleAddToCart() {
    this.addToCartService.setCartCount(this.numOfCartItems + 1);
  }
}
