import { Component, inject, OnInit } from '@angular/core';
import { CardListComponent } from '../card-list/card-list.component';
import { ActivatedRoute } from '@angular/router';
import { FetchProductsService } from '../../../../shared/services/fetch-products/fetch-products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products!: Array<any>;
  private fetchProductsService = inject(FetchProductsService);

  ngOnInit(): void {
    this.fetchProductsService.getProducts().subscribe((res) => {
      const data = <{ products: Array<any> }>res;
      this.products = data.products;
    });
  }
}
