import { Order } from '../../domain/model/Order';
import { OrderId } from '../../domain/value-objects/OrderId';
import { DomainError } from '../../domain/errors/DomainError';
import { ConfirmOrderUseCase } from '../../domain/ports/input.ports';
import { NotificationPort, OrderRepository, EventBus } from '../../domain/ports/output.ports';

export class ConfirmOrderService implements ConfirmOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly notificationPort: NotificationPort,
    private readonly eventBus: EventBus,
  ) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(OrderId.create(orderId));
    if (!order) throw new DomainError('ORDER_NOT_FOUND', `Order not found: ${orderId}`);
    order.confirm();
    await this.orderRepository.save(order);
    await this.notificationPort.notifyOrderConfirmed(order);
    await this.eventBus.publish(order.pullDomainEvents());
    return order;
  }
}
