import { DomainError } from '../errors/DomainError';
import { OrderId } from '../value-objects/OrderId';
import { CustomerId } from '../value-objects/CustomerId';
import { Money } from '../value-objects/Money';
import { DomainEvent } from '../events/DomainEvent';
import { OrderCreatedEvent } from '../events/OrderCreatedEvent';
import { OrderConfirmedEvent } from '../events/OrderConfirmedEvent';
import { OrderCancelledEvent } from '../events/OrderCancelledEvent';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'CANCELLED';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: Money;
}

export class Order {
  private _domainEvents: DomainEvent[] = [];

  constructor(
    public readonly id: OrderId,
    public readonly customerId: CustomerId,
    public readonly items: OrderItem[],
    public status: OrderStatus,
    public readonly createdAt: Date,
  ) {}

  get total(): Money {
    if (this.items.length === 0) return Money.of(0, 'EUR');
    return this.items.reduce(
      (sum, item) => sum.add(Money.of(item.unitPrice.amount * item.quantity, item.unitPrice.currency)),
      Money.of(0, this.items[0].unitPrice.currency),
    );
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }

  confirm(): void {
    if (this.status !== 'PENDING') {
      throw new DomainError('INVALID_STATUS', `Cannot confirm order in status: ${this.status}`);
    }
    this.status = 'CONFIRMED';
    this._domainEvents.push(new OrderConfirmedEvent(this.id));
  }

  cancel(): void {
    if (this.status === 'SHIPPED') {
      throw new DomainError('ALREADY_SHIPPED', 'Cannot cancel a shipped order');
    }
    if (this.status === 'CANCELLED') {
      throw new DomainError('ALREADY_CANCELLED', 'Order is already cancelled');
    }
    this.status = 'CANCELLED';
    this._domainEvents.push(new OrderCancelledEvent(this.id));
  }

  static create(id: OrderId, customerId: CustomerId, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new DomainError('NO_ITEMS', 'An order must have at least one item');
    }
    if (items.some(i => i.quantity <= 0)) {
      throw new DomainError('INVALID_QUANTITY', 'All items must have a positive quantity');
    }
    const order = new Order(id, customerId, items, 'PENDING', new Date());
    order._domainEvents.push(new OrderCreatedEvent(id, customerId));
    return order;
  }
}
