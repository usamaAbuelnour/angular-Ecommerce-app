import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddToCartService } from '../../shared/services/add-to-cart/add-to-cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  numOfCartItems!: number;
  private addToCartService = inject(AddToCartService);

  ngOnInit() {
    this.addToCartService
      .getCartCount()
      .subscribe((data) => (this.numOfCartItems = data));
  }
}
