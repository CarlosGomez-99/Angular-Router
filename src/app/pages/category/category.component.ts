import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from './../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
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
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          .subscribe(data => {
            console.log(data);

            let productsCount = this.products.length;
            if (productsCount === 0) {
              this.products = data;
            } else {
              this.products = this.products.concat(data);
            }
            this.offset += this.limit;
          });
      }
    });
  }
}
