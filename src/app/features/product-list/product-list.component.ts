import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductService } from '../../core/service/product/product.service';
import { Product, productFromDto } from '../../core/models/product.model';
import { ProductResponseDto } from '../../core/dtos/product/product-response.dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCardComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts().pipe(
      map((dtos: ProductResponseDto[]) => dtos.map(dto => productFromDto(dto)))
    );
  }
}

