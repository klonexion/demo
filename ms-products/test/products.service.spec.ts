
import { ProductsService } from '../src/products/products.service';
import { ProductsRepository } from '../src/products/products.repository';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService(new ProductsRepository());
  });

  it('creates and retrieves a product', async () => {
    const created = await service.create({
      name: 'Laptop',
      sku: 'LP-001',
      price: 1000,
      currency: 'USD',
      companyId: 'c01',
      isActive: true,
    });
    const fetched = await service.findOne(created.id);
    expect(fetched.name).toBe('Laptop');
  });

  it('filters by companyId', async () => {
    await service.create({ name: 'A', sku: 'A-1', price: 1, currency: 'USD', companyId: 'x', isActive: true });
    await service.create({ name: 'B', sku: 'B-1', price: 1, currency: 'USD', companyId: 'y', isActive: true });
    const list = await service.findAll('x');
    expect(list).toHaveLength(1);
    expect(list[0].companyId).toBe('x');
  });
});
