import { Order } from '../../domain/model/Order';
import { OrderId } from '../../domain/value-objects/OrderId';
import { DomainError } from '../../domain/errors/DomainError';
import { CancelOrderUseCase } from '../../domain/ports/input.ports';
import { NotificationPort, OrderRepository, EventBus } from '../../domain/ports/output.ports';

export class CancelOrderService implements CancelOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly notificationPort: NotificationPort,
    private readonly eventBus: EventBus,
  ) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(OrderId.create(orderId));
    if (!order) throw new DomainError('ORDER_NOT_FOUND', `Order not found: ${orderId}`);
    order.cancel();
    await this.orderRepository.save(order);
    await this.notificationPort.notifyOrderCancelled(order);
    await this.eventBus.publish(order.pullDomainEvents());
    return order;
  }
}
