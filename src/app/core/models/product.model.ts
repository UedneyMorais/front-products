import { ProductResponseDto } from "../dtos/product/product-response.dto";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;  // Garantimos que será number
  imagePath: string;
  // Não inclua campos que não serão usados
}

export function productFromDto(dto: ProductResponseDto): Product {
  return {
    id: dto.id,
    slug: dto.slug,
    name: dto.name,
    description: dto.description,
    price: typeof dto.price === 'string' ? parseFloat(dto.price) : dto.price,
    imagePath: dto.imagePath
    // Ignora campos que não existem no Model (createdAt, updatedAt)
  };
}
