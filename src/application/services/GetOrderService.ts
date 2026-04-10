import { Order } from '../../domain/model/Order';
import { OrderId } from '../../domain/value-objects/OrderId';
import { DomainError } from '../../domain/errors/DomainError';
import { GetOrderUseCase } from '../../domain/ports/input.ports';
import { OrderRepository } from '../../domain/ports/output.ports';

export class GetOrderService implements GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(OrderId.create(orderId));
    if (!order) {
      throw new DomainError('ORDER_NOT_FOUND', `Order not found: ${orderId}`);
    }
    return order;
  }
}
