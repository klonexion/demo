
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  async findAll(companyId?: string): Promise<Product[]> {
    return this.repo.findAll(companyId);
  }

  async findOne(id: string): Promise<Product> {
    const item = await this.repo.findOne(id);
    if (!item) throw new NotFoundException('Product not found');
    return item;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    return this.repo.create({
      ...dto,
      isActive: dto.isActive ?? true,
    });
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const ok = await this.repo.softDelete(id);
    if (!ok) throw new NotFoundException('Product not found');
  }
}
