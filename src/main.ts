// Composition Root — el unico lugar que conoce las implementaciones concretas
import { InMemoryOrderRepository } from './infrastructure/driven/InMemoryOrderRepository';
import { ConsoleNotificationAdapter } from './infrastructure/driven/ConsoleNotificationAdapter';
import { CreateOrderService } from './application/services/CreateOrderService';
import { GetOrderService } from './application/services/GetOrderService';
import { ConfirmOrderService } from './application/services/ConfirmOrderService';
import { CancelOrderService } from './application/services/CancelOrderService';

async function main() {
  // Wiring — inyeccion de dependencias manual
  const orderRepository = new InMemoryOrderRepository();
  const notificationAdapter = new ConsoleNotificationAdapter();

  const createOrder = new CreateOrderService(orderRepository, notificationAdapter);
  const getOrder = new GetOrderService(orderRepository);
  const confirmOrder = new ConfirmOrderService(orderRepository, notificationAdapter);
  const cancelOrder = new CancelOrderService(orderRepository, notificationAdapter);

  // Demo
  const order = await createOrder.execute({
    customerId: 'customer-1',
    items: [
      { productId: 'prod-1', name: 'Laptop', quantity: 1, unitPrice: 999, currency: 'EUR' },
      { productId: 'prod-2', name: 'Mouse',  quantity: 2, unitPrice: 25,  currency: 'EUR' },
    ],
  });

  console.log(`Order created: ${order.id.value}, total: ${order.total}`);

  await confirmOrder.execute(order.id.value);
  console.log(`Order status: ${order.status}`);
}

main().catch(console.error);
