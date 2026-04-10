import { Order } from '../../domain/model/Order';
import { OrderId } from '../../domain/value-objects/OrderId';
import { OrderRepository } from '../../domain/ports/output.ports';

export class InMemoryOrderRepository implements OrderRepository {
  private readonly store = new Map<string, Order>();

  async save(order: Order): Promise<void> {
    this.store.set(order.id.value, order);
  }

  async findById(id: OrderId): Promise<Order | null> {
    return this.store.get(id.value) ?? null;
  }

  async findAll(): Promise<Order[]> {
    return Array.from(this.store.values());
  }
}
