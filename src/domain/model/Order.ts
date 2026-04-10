import { DomainError } from '../errors/DomainError';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'CANCELLED';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export class Order {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public status: OrderStatus,
    public readonly createdAt: Date,
  ) {}

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  confirm(): void {
    if (this.status !== 'PENDING') {
      throw new DomainError('INVALID_STATUS', `Cannot confirm order in status: ${this.status}`);
    }
    this.status = 'CONFIRMED';
  }

  cancel(): void {
    if (this.status === 'SHIPPED') {
      throw new DomainError('ALREADY_SHIPPED', 'Cannot cancel an order that has been shipped');
    }
    if (this.status === 'CANCELLED') {
      throw new DomainError('ALREADY_CANCELLED', 'Order is already cancelled');
    }
    this.status = 'CANCELLED';
  }

  static create(id: string, customerId: string, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new DomainError('NO_ITEMS', 'An order must have at least one item');
    }
    if (items.some(i => i.quantity <= 0)) {
      throw new DomainError('INVALID_QUANTITY', 'All items must have a positive quantity');
    }
    return new Order(id, customerId, items, 'PENDING', new Date());
  }
}
