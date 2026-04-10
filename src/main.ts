import express from 'express';
import { InMemoryOrderRepository } from './infrastructure/driven/InMemoryOrderRepository';
import { ConsoleNotificationAdapter } from './infrastructure/driven/ConsoleNotificationAdapter';
import { ConsoleEventBus } from './infrastructure/driven/ConsoleEventBus';
import { CreateOrderService } from './application/services/CreateOrderService';
import { GetOrderService } from './application/services/GetOrderService';
import { ConfirmOrderService } from './application/services/ConfirmOrderService';
import { CancelOrderService } from './application/services/CancelOrderService';
import { createOrderRouter } from './infrastructure/driving/OrderController';

const orderRepository = new InMemoryOrderRepository();
const notificationAdapter = new ConsoleNotificationAdapter();
const eventBus = new ConsoleEventBus();

const createOrder = new CreateOrderService(orderRepository, notificationAdapter, eventBus);
const getOrder = new GetOrderService(orderRepository);
const confirmOrder = new ConfirmOrderService(orderRepository, notificationAdapter, eventBus);
const cancelOrder = new CancelOrderService(orderRepository, notificationAdapter, eventBus);

const app = express();
app.use(express.json());
app.use('/orders', createOrderRouter(createOrder, getOrder, confirmOrder, cancelOrder));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
