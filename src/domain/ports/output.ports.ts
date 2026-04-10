import { Order } from '../model/Order';
import { OrderId } from '../value-objects/OrderId';
import { DomainEvent } from '../events/DomainEvent';

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

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>;
}

export interface UnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  orders: OrderRepository;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  errorCode?: string;
}

export interface PaymentGateway {
  charge(customerId: string, amount: number, currency: string): Promise<PaymentResult>;
}
