import { DomainEvent } from './DomainEvent';
import { OrderId } from '../value-objects/OrderId';

export class OrderConfirmedEvent extends DomainEvent {
  constructor(public readonly orderId: OrderId) {
    super('OrderConfirmed');
  }
}
