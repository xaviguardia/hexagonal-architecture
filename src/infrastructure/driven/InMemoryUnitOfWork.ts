import { UnitOfWork } from '../../domain/ports/output.ports';
import { InMemoryOrderRepository } from './InMemoryOrderRepository';

export class InMemoryUnitOfWork implements UnitOfWork {
  public readonly orders: InMemoryOrderRepository;

  constructor() {
    this.orders = new InMemoryOrderRepository();
  }

  async begin(): Promise<void> {
    // no-op for in-memory
  }

  async commit(): Promise<void> {
    console.log('[UnitOfWork] Committed');
  }

  async rollback(): Promise<void> {
    console.log('[UnitOfWork] Rolled back');
  }
}
