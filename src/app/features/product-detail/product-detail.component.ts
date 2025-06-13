import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product, productFromDto } from '../../core/models/product.model';
import { ProductService } from '../../core/service/product/product.service';
import { SeoService } from '../../core/service/seo/seo.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;
  currentUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private seoService: SeoService
  ) {
    this.product$ = this.productService
      .getProductBySlug(this.route.snapshot.params['slug'])
      .pipe(map(productFromDto));
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.currentUrl = window.location.href;
    }

    this.product$.subscribe(product => {
      this.seoService.updateMetaTags({
        title: `${product.name} | Nossa Loja`,
        description: product.description,
        image: product.imagePath
      });
    });
  }
}
