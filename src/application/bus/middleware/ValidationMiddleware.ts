import { Command, Middleware } from '../CommandBus';
import { DomainError } from '../../../domain/errors/DomainError';

export const validationMiddleware: Middleware = async (command: Command, next) => {
  const cmd = command as unknown as Record<string, unknown>;
  if ('customerId' in cmd && !cmd['customerId']) {
    throw new DomainError('MISSING_CUSTOMER_ID', 'customerId is required');
  }
  return next();
};
