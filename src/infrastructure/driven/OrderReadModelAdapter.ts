import { Order } from '../../domain/model/Order';
import { OrderId } from '../../domain/value-objects/OrderId';
import { OrderRepository } from '../../domain/ports/output.ports';
import { GetOrderQuery, ListOrdersQuery, OrderReadModel } from '../../application/queries/GetOrderQuery';
import { DomainError } from '../../domain/errors/DomainError';

function toReadModel(order: Order): OrderReadModel {
  return {
    id: order.id.value,
    customerId: order.customerId.value,
    status: order.status,
    total: order.total.toString(),
    itemCount: order.items.length,
    createdAt: order.createdAt.toISOString(),
  };
}

export class GetOrderQueryHandler implements GetOrderQuery {
  constructor(private readonly repo: OrderRepository) {}
  async execute(orderId: string): Promise<OrderReadModel> {
    const order = await this.repo.findById(OrderId.create(orderId));
    if (!order) throw new DomainError('ORDER_NOT_FOUND', `Order not found: ${orderId}`);
    return toReadModel(order);
  }
}

export class ListOrdersQueryHandler implements ListOrdersQuery {
  constructor(private readonly repo: OrderRepository) {}
  async execute(): Promise<OrderReadModel[]> {
    const orders = await this.repo.findAll();
    return orders.map(toReadModel);
  }
}
