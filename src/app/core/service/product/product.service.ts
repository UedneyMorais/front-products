import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { PaginatedResponseDto } from '../../dtos/api/paginated-response.dto';
import { ProductResponseDto } from '../../dtos/product/product-response.dto';
import { CreateProductDto } from '../../dtos/product/create-product.dto';
import { UpdateProductDto } from '../../dtos/product/update-product.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  // getProducts(page = 1) {
  //   return this.http.get<PaginatedResponseDto<ProductResponseDto>>(`${this.apiUrl}?page=${page}`);
  // }

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponseDto[]> {
    return this.http.get<ProductResponseDto[]>(this.apiUrl);
  }


  // getProducts(): Observable<Product[]> {
  //   return this.http.get<ProductResponseDto[]>(this.apiUrl);
  // }

  getProductBySlug(slug: string) {
    return this.http.get<ProductResponseDto>(`${this.apiUrl}/${slug}`);
  }

  createProduct(dto: CreateProductDto) {
    const formData = new FormData();
    formData.append('name', dto.name);
    formData.append('description', dto.description);
    formData.append('price', dto.price.toString());
    if (dto.image) {
      formData.append('image', dto.image);
    }

    return this.http.post<ProductResponseDto>(this.apiUrl, formData);
  }

  updateProduct(id: string, dto: UpdateProductDto) {
    const formData = new FormData();
    if (dto.name) formData.append('name', dto.name);
    if (dto.description) formData.append('description', dto.description);
    if (dto.price) formData.append('price', dto.price.toString());
    if (dto.image) formData.append('image', dto.image);

    return this.http.patch<ProductResponseDto>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
