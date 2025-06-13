// src/app/features/product-list/product-list.component.ts

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, BehaviorSubject, catchError, of, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/service/product/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true, // Garanta que é standalone
  imports: [
    CommonModule,          // Para AsyncPipe, NgIf, NgFor
    RouterLink,            // Para a diretiva routerLink
    ProductCardComponent,  // Para reconhecer app-product-card
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  // Propriedade para a lista de produtos (Observable)
  products$: Observable<Product[]> | null = null;

  // Variável de estado reativa para o carregamento (Observable)
  private _isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this._isLoading.asObservable(); // Acesso público com '$'

  // Variável de estado reativa para mensagens de erro (Observable)
  private _errorMessage = new BehaviorSubject<string | null>(null);
  errorMessage$ = this._errorMessage.asObservable(); // Acesso público com '$'

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    // Carrega os produtos quando o componente é inicializado
    this.loadProducts();
  }

  /**
   * Carrega a lista de produtos do serviço.
   * Define os estados de carregamento e erro.
   */
  loadProducts(): void {
    this._isLoading.next(true);      // Ativa o spinner de carregamento
    this._errorMessage.next(null);   // Limpa qualquer mensagem de erro anterior

    this.products$ = this.productsService.getProducts().pipe(
      catchError((error: Error) => { // Captura o erro emitido pelo ProductsService
        console.error('Erro ao carregar produtos no componente:', error.message);
        this._errorMessage.next(error.message); // Define a mensagem de erro para exibição
        return of([]); // Retorna um Observable vazio para que o `@for` não quebre
      }),
      finalize(() => this._isLoading.next(false)) // Desativa o spinner ao finalizar (sucesso ou erro)
    );
  }

  /**
   * Manipula o evento de exclusão de um produto vindo do ProductCardComponent.
   * @param id O ID do produto a ser excluído.
   */
  onDeleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this._isLoading.next(true); // Ativa o spinner durante a exclusão
      this.productsService.deleteProduct(id).pipe(
        finalize(() => this._isLoading.next(false)), // Desativa o spinner
        catchError((error: Error) => { // Captura o erro emitido pelo ProductsService
          console.error(`Erro ao excluir produto com ID ${id}:`, error.message);
          this._errorMessage.next(`Falha ao excluir produto: ${error.message}`);
          return of(undefined); // Retorna um Observable que completa sem valor
        })
      ).subscribe({
        next: () => {
          console.log(`Produto com ID ${id} excluído com sucesso!`);
          this.loadProducts(); // Recarrega a lista para refletir a exclusão
        },
        // O tratamento de erro já está no `catchError` do pipe, mas você pode adicionar um `error` callback aqui para lógica adicional se precisar
        // error: (err) => { /* Lógica adicional de erro */ }
      });
    }
  }
}
