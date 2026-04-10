import { Router, Request, Response } from 'express';
import { CreateOrderUseCase, GetOrderUseCase, ConfirmOrderUseCase, CancelOrderUseCase } from '../../domain/ports/input.ports';
import { DomainError } from '../../domain/errors/DomainError';

export function createOrderRouter(
  createOrder: CreateOrderUseCase,
  getOrder: GetOrderUseCase,
  confirmOrder: ConfirmOrderUseCase,
  cancelOrder: CancelOrderUseCase,
): Router {
  const router = Router();

  router.post('/', async (req: Request, res: Response) => {
    try {
      const order = await createOrder.execute(req.body);
      res.status(201).json(order);
    } catch (e) {
      if (e instanceof DomainError) return void res.status(422).json({ code: e.code, message: e.message });
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const order = await getOrder.execute(req.params['id'] as string);
      res.json(order);
    } catch (e) {
      if (e instanceof DomainError) return void res.status(404).json({ code: e.code, message: e.message });
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/:id/confirm', async (req: Request, res: Response) => {
    try {
      const order = await confirmOrder.execute(req.params['id'] as string);
      res.json(order);
    } catch (e) {
      if (e instanceof DomainError) return void res.status(422).json({ code: e.code, message: e.message });
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/:id/cancel', async (req: Request, res: Response) => {
    try {
      const order = await cancelOrder.execute(req.params['id'] as string);
      res.json(order);
    } catch (e) {
      if (e instanceof DomainError) return void res.status(422).json({ code: e.code, message: e.message });
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
}
