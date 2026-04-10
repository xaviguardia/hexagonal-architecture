import { CreateOrderService } from '../services/CreateOrderService';
import { InMemoryOrderRepository } from '../../infrastructure/driven/InMemoryOrderRepository';
import { ConsoleNotificationAdapter } from '../../infrastructure/driven/ConsoleNotificationAdapter';
import { ConsoleEventBus } from '../../infrastructure/driven/ConsoleEventBus';

describe('CreateOrderService', () => {
  it('creates and saves an order', async () => {
    const repo = new InMemoryOrderRepository();
    const notifications = new ConsoleNotificationAdapter();
    const eventBus = new ConsoleEventBus();
    const service = new CreateOrderService(repo, notifications, eventBus);

    const order = await service.execute({
      customerId: 'customer-1',
      items: [{ productId: 'prod-1', name: 'Laptop', quantity: 1, unitPrice: 999, currency: 'EUR' }],
    });

    expect(order.status).toBe('PENDING');
    const saved = await repo.findById(order.id);
    expect(saved).not.toBeNull();
  });

  it('throws when no items provided', async () => {
    const repo = new InMemoryOrderRepository();
    const service = new CreateOrderService(repo, new ConsoleNotificationAdapter(), new ConsoleEventBus());
    await expect(service.execute({ customerId: 'c1', items: [] })).rejects.toThrow();
  });
});
