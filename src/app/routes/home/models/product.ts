export interface Product {
  id: number;
  title: string;
  description: string;
  images: Array<string>;
  price: number;
  rating: number;
  category?: string;
  brand?: string;
  availabilityStatus: 'Low Stock' | 'In Stock';
}
