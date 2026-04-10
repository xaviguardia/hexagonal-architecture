import { DomainError } from '../errors/DomainError';

export class OrderId {
  private constructor(public readonly value: string) {}

  static create(value: string): OrderId {
    if (!value || value.trim().length === 0) {
      throw new DomainError('INVALID_ORDER_ID', 'OrderId cannot be empty');
    }
    return new OrderId(value);
  }

  equals(other: OrderId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
