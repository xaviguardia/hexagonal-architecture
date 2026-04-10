import { Order } from '../model/Order';
import { Currency } from '../value-objects/Money';

export interface CreateOrderCommand {
  customerId: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    currency: Currency;
  }>;
}

export interface CreateOrderUseCase {
  execute(command: CreateOrderCommand): Promise<Order>;
}

export interface GetOrderUseCase {
  execute(orderId: string): Promise<Order>;
}

export interface ConfirmOrderUseCase {
  execute(orderId: string): Promise<Order>;
}

export interface CancelOrderUseCase {
  execute(orderId: string): Promise<Order>;
}
