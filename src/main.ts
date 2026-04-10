import express from 'express';
import { InMemoryOrderRepository } from './infrastructure/driven/InMemoryOrderRepository';
import { ConsoleNotificationAdapter } from './infrastructure/driven/ConsoleNotificationAdapter';
import { ConsoleEventBus } from './infrastructure/driven/ConsoleEventBus';
import { StripePaymentGateway } from './infrastructure/driven/StripePaymentGateway';
import { CircuitBreakerPaymentGateway } from './infrastructure/driven/CircuitBreakerPaymentGateway';
import { CreateOrderService } from './application/services/CreateOrderService';
import { GetOrderService } from './application/services/GetOrderService';
import { ConfirmOrderService } from './application/services/ConfirmOrderService';
import { CancelOrderService } from './application/services/CancelOrderService';
import { createOrderRouter } from './infrastructure/driving/OrderController';
import { CommandBus } from './application/bus/CommandBus';
import { loggingMiddleware } from './application/bus/middleware/LoggingMiddleware';
import { validationMiddleware } from './application/bus/middleware/ValidationMiddleware';
import { InMemorySchemaRepository } from './infrastructure/persistence/InMemorySchemaRepository';
import { GetOrderSchemaUseCase } from './application/use-cases/GetOrderSchemaUseCase';

const orderRepository = new InMemoryOrderRepository();
const notificationAdapter = new ConsoleNotificationAdapter();
const eventBus = new ConsoleEventBus();
const paymentGateway = new CircuitBreakerPaymentGateway(new StripePaymentGateway());

const createOrder = new CreateOrderService(orderRepository, notificationAdapter, eventBus);
const getOrder = new GetOrderService(orderRepository);
const confirmOrder = new ConfirmOrderService(orderRepository, notificationAdapter, eventBus);
const cancelOrder = new CancelOrderService(orderRepository, notificationAdapter, eventBus);

const schemaRepository = new InMemorySchemaRepository();
const getOrderSchema = new GetOrderSchemaUseCase(schemaRepository);

const commandBus = new CommandBus();
commandBus.use(loggingMiddleware);
commandBus.use(validationMiddleware);

const app = express();
app.use(express.json());
app.use('/orders', createOrderRouter(createOrder, getOrder, confirmOrder, cancelOrder, getOrderSchema));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
