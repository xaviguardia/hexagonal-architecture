import { DomainError } from '../../domain/errors/DomainError';
import { OrderId } from '../../domain/value-objects/OrderId';
import { UnitOfWork, EventBus } from '../../domain/ports/output.ports';
import { ConfirmOrderUseCase } from '../../domain/ports/input.ports';
import { Order } from '../../domain/model/Order';

export class ConfirmOrderWithUoWService implements ConfirmOrderUseCase {
  constructor(
    private readonly uow: UnitOfWork,
    private readonly eventBus: EventBus,
  ) {}

  async execute(orderId: string): Promise<Order> {
    await this.uow.begin();
    try {
      const order = await this.uow.orders.findById(OrderId.create(orderId));
      if (!order) throw new DomainError('ORDER_NOT_FOUND', `Order not found: ${orderId}`);
      order.confirm();
      await this.uow.orders.save(order);
      await this.uow.commit();
      await this.eventBus.publish(order.pullDomainEvents());
      return order;
    } catch (e) {
      await this.uow.rollback();
      throw e;
    }
  }
}
