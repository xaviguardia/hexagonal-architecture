import { Order } from '../model/Order';
import { OrderId } from '../value-objects/OrderId';
import { CustomerId } from '../value-objects/CustomerId';
import { Money } from '../value-objects/Money';
import { DomainError } from '../errors/DomainError';

const makeOrder = () => Order.create(
  OrderId.create('order-1'),
  CustomerId.create('customer-1'),
  [{ productId: 'prod-1', name: 'Laptop', quantity: 1, unitPrice: Money.of(999, 'EUR') }],
);

describe('Order', () => {
  it('creates an order in PENDING status', () => {
    const order = makeOrder();
    expect(order.status).toBe('PENDING');
  });

  it('emits OrderCreatedEvent on create', () => {
    const order = makeOrder();
    const events = order.pullDomainEvents();
    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('OrderCreated');
  });

  it('confirms a pending order', () => {
    const order = makeOrder();
    order.pullDomainEvents(); // clear
    order.confirm();
    expect(order.status).toBe('CONFIRMED');
    const events = order.pullDomainEvents();
    expect(events[0].eventName).toBe('OrderConfirmed');
  });

  it('throws when confirming a non-pending order', () => {
    const order = makeOrder();
    order.confirm();
    expect(() => order.confirm()).toThrow(DomainError);
  });

  it('cancels an order', () => {
    const order = makeOrder();
    order.cancel();
    expect(order.status).toBe('CANCELLED');
  });

  it('throws when creating order with no items', () => {
    expect(() => Order.create(OrderId.create('o1'), CustomerId.create('c1'), [])).toThrow(DomainError);
  });

  it('calculates total correctly', () => {
    const order = Order.create(
      OrderId.create('o1'),
      CustomerId.create('c1'),
      [
        { productId: 'p1', name: 'A', quantity: 2, unitPrice: Money.of(10, 'EUR') },
        { productId: 'p2', name: 'B', quantity: 1, unitPrice: Money.of(5, 'EUR') },
      ],
    );
    expect(order.total.amount).toBe(25);
  });
});
