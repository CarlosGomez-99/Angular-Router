import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from './../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category',
  template: '<app-products [products]="products" (loadMore)="onLoadMore()"></app-products>',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.onLoadMore();
  }

  onLoadMore() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
          }
          return [];
        })
      )
      .subscribe((data) => {
        let productsCount = this.products.length;
        if (productsCount === 0) {
          this.products = data;
        } else {
          this.products = this.products.concat(data);
        }
        this.offset += this.limit;
      });
  }
}
