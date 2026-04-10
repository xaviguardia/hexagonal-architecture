import { DomainEvent } from './DomainEvent';
import { OrderId } from '../value-objects/OrderId';

export class OrderCancelledEvent extends DomainEvent {
  constructor(public readonly orderId: OrderId) {
    super('OrderCancelled');
  }
}
