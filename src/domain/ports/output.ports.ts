import { Order } from '../model/Order';
import { OrderId } from '../value-objects/OrderId';

export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: OrderId): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}

export interface NotificationPort {
  notifyOrderCreated(order: Order): Promise<void>;
  notifyOrderCancelled(order: Order): Promise<void>;
  notifyOrderConfirmed(order: Order): Promise<void>;
}
