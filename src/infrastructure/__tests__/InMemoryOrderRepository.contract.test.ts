import { InMemoryOrderRepository } from '../driven/InMemoryOrderRepository';
import { Order } from '../../domain/model/Order';
import { OrderId } from '../../domain/value-objects/OrderId';
import { CustomerId } from '../../domain/value-objects/CustomerId';
import { Money } from '../../domain/value-objects/Money';

function testOrderRepositoryContract(name: string, makeRepo: () => InMemoryOrderRepository) {
  describe(`${name} — OrderRepository contract`, () => {
    const makeOrder = (id: string) => Order.create(
      OrderId.create(id),
      CustomerId.create('customer-1'),
      [{ productId: 'p1', name: 'Item', quantity: 1, unitPrice: Money.of(10, 'EUR') }],
    );

    it('saves and retrieves an order by id', async () => {
      const repo = makeRepo();
      const order = makeOrder('order-1');
      await repo.save(order);
      const found = await repo.findById(OrderId.create('order-1'));
      expect(found).not.toBeNull();
      expect(found!.id.value).toBe('order-1');
    });

    it('returns null for non-existent order', async () => {
      const repo = makeRepo();
      const result = await repo.findById(OrderId.create('not-exists'));
      expect(result).toBeNull();
    });

    it('findAll returns all saved orders', async () => {
      const repo = makeRepo();
      await repo.save(makeOrder('o1'));
      await repo.save(makeOrder('o2'));
      const all = await repo.findAll();
      expect(all).toHaveLength(2);
    });
  });
}

testOrderRepositoryContract('InMemoryOrderRepository', () => new InMemoryOrderRepository());
