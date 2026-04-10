import { Order } from '../../domain/model/Order';
import { NotificationPort } from '../../domain/ports/output.ports';

export class ConsoleNotificationAdapter implements NotificationPort {
  async notifyOrderCreated(order: Order): Promise<void> {
    console.log(`[Notification] Order created: ${order.id.value} — total: ${order.total}`);
  }

  async notifyOrderConfirmed(order: Order): Promise<void> {
    console.log(`[Notification] Order confirmed: ${order.id.value}`);
  }

  async notifyOrderCancelled(order: Order): Promise<void> {
    console.log(`[Notification] Order cancelled: ${order.id.value}`);
  }
}
