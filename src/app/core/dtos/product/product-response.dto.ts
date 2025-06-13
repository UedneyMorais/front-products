export interface ProductResponseDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number | string;
  imagePath: string;
  createdAt?: string;
  updatedAt?: string;
}
