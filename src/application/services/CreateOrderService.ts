import { v4 as uuidv4 } from 'uuid';
import { Order } from '../../domain/model/Order';
import { OrderId } from '../../domain/value-objects/OrderId';
import { CustomerId } from '../../domain/value-objects/CustomerId';
import { Money } from '../../domain/value-objects/Money';
import { CreateOrderCommand, CreateOrderUseCase } from '../../domain/ports/input.ports';
import { NotificationPort, OrderRepository } from '../../domain/ports/output.ports';

export class CreateOrderService implements CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly notificationPort: NotificationPort,
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const order = Order.create(
      OrderId.create(uuidv4()),
      CustomerId.create(command.customerId),
      command.items.map(i => ({
        productId: i.productId,
        name: i.name,
        quantity: i.quantity,
        unitPrice: Money.of(i.unitPrice, i.currency),
      })),
    );
    await this.orderRepository.save(order);
    await this.notificationPort.notifyOrderCreated(order);
    return order;
  }
}
