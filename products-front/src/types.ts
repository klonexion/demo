
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  currency: string;
  companyId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  sku: string;
  price: number;
  currency: string;
  companyId: string;
  isActive?: boolean;
}
