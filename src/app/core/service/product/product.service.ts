// src/app/core/services/product.service.ts

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError, catchError, map } from 'rxjs';

import { Product, productFromDto } from '../../models/product.model';
import { PaginatedResponseDto } from '../../dtos/api/paginated-response.dto';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';
import { CreateProductDto } from '../../dtos/product/create-product.dto';
import { UpdateProductDto } from '../../dtos/product/update-product.dto';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductResponseDto[]>(this.apiUrl).pipe(
      map((dtos: ProductResponseDto[]) => dtos.map(dto => productFromDto(dto))),
      catchError(this.handleError)
    );
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<ProductResponseDto>(`${this.apiUrl}/slug/${slug}`).pipe(
      map((dto: ProductResponseDto) => productFromDto(dto)),
      catchError(this.handleError)
    );
  }

  createProduct(dto: CreateProductDto): Observable<Product> {
    const formData = new FormData();
    formData.append('name', dto.name);
    formData.append('description', dto.description);
    formData.append('price', dto.price.toString());
    if (dto.image) {
      formData.append('image', dto.image);
    }

    return this.http.post<ProductResponseDto>(this.apiUrl, formData).pipe(
      map((responseDto: ProductResponseDto) => productFromDto(responseDto)),
      catchError(this.handleError)
    );
  }

  updateProduct(id: string, dto: UpdateProductDto): Observable<Product> {
    const formData = new FormData();
    if (dto.name) formData.append('name', dto.name);
    if (dto.description) formData.append('description', dto.description);
    if (dto.price) formData.append('price', dto.price.toString());
    if (dto.image) formData.append('image', dto.image);

    return this.http.patch<ProductResponseDto>(`${this.apiUrl}/${id}`, formData).pipe(
      map((responseDto: ProductResponseDto) => productFromDto(responseDto)),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão ou se o backend está online.';
          break;
        case 404:
          errorMessage = `Recurso não encontrado: ${error.url || ''}`;
          break;
        case 401:
          errorMessage = 'Não autorizado. Por favor, faça login novamente.';
          break;
        case 403:
          errorMessage = 'Você não tem permissão para realizar esta ação.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
        default:
          errorMessage = `Erro do servidor (Código: ${error.status}): ${error.message}`;
      }
    }
    console.error('Erro HTTP:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
