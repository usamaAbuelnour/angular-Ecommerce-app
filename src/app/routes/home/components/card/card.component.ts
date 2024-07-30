import { OnInit, Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AddToCartService } from '../../../../shared/services/add-to-cart/add-to-cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() product!: Product;
  price!: string;
  fraction!: string;
  ratingStars!: Array<undefined>;
  hasHalfStar!: boolean;

  numOfItems!: number;

  constructor(
    private router: Router,
    private addToCartService: AddToCartService
  ) {}

  ngOnInit(): void {
    [this.price, this.fraction] = this.product.price.toString().split('.');
    this.calculateRatingStars();
    this.addToCartService.getCartCount().subscribe(data=>this.numOfItems = data)

  }

  private calculateRatingStars(): void {
    let numberOfStars;
    if (this.product.rating.toString().includes('.')) {
      numberOfStars = Number(this.product.rating.toString().split('.')[0]);

      this.hasHalfStar =
        Number(this.product.rating.toString().split('.')[1]) > 50
          ? true
          : false;
    } else numberOfStars = this.product.rating;

    this.ratingStars = Array(numberOfStars);
  }

  handleClick(e: Event) {
    const element = <HTMLElement>e.target;
    if (element.id !== 'add-to-cart')
      this.router.navigate(['/product-details', this.product.id]);
  }

  handleAddToCart() {
    this.router.navigate(['/cart']);
    this.addToCartService.setCartItems({
      image: this.product.images[0],
      title: this.product.title,
      quantity: 1,
      price: Number(this.product.price),
    }, 'home', 'add');


  }

  
}
