
import { Product } from './entities/product.entity';
import { randomUUID } from 'crypto';

export class ProductsRepository {
  private items: Product[] = [];

  async findAll(companyId?: string): Promise<Product[]> {
    const list = this.items.filter(p => p.isActive);
    return companyId ? list.filter(p => p.companyId === companyId) : list;
  }

  async findOne(id: string): Promise<Product | undefined> {
    return this.items.find(p => p.id === id && p.isActive);
  }

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const now = new Date().toISOString();
    const prod: Product = { id: randomUUID(), createdAt: now, updatedAt: now, ...data };
    this.items.push(prod);
    return prod;
  }

  async update(id: string, patch: Partial<Product>): Promise<Product | undefined> {
    const idx = this.items.findIndex(p => p.id === id && p.isActive);
    if (idx === -1) return undefined;
    const now = new Date().toISOString();
    this.items[idx] = { ...this.items[idx], ...patch, updatedAt: now };
    return this.items[idx];
  }

  async softDelete(id: string): Promise<boolean> {
    const item = this.items.find(p => p.id === id && p.isActive);
    if (!item) return false;
    item.isActive = false;
    item.updatedAt = new Date().toISOString();
    return true;
  }
}
