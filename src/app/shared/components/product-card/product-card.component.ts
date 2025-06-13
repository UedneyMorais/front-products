// src/app/shared/components/product-card/product-card.component.ts

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'; // Adicione OnInit
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../../core/models/product.model'; // Ajuste o caminho se for diferente

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CurrencyPipe,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit { // Implemente OnInit
  @Input({ required: true }) product!: Product;
  @Output() deleteProduct = new EventEmitter<number>(); // Se você estiver usando para deletar

  // Adicione esta propriedade para a URL base da sua API de imagens
  // Ajuste a porta (3000) se o seu backend estiver em outra
  private API_BASE_URL = 'http://localhost:3000';

  fullImagePath!: string;

  ngOnInit(): void {

    if (this.product.imagePath) {

      if (this.product.imagePath.startsWith('/')) {
        this.fullImagePath = `${this.API_BASE_URL}${this.product.imagePath}`;
        console.log(this.fullImagePath);
      } else {
        this.fullImagePath = `${this.API_BASE_URL}/${this.product.imagePath}`;
        console.log(this.fullImagePath);
      }
    } else {
      this.fullImagePath = 'assets/placeholder.png';
    }
  }

  onDeleteClick(): void {
    this.deleteProduct.emit(+this.product.id);
  }
}
