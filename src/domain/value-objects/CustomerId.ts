import { DomainError } from '../errors/DomainError';

export class CustomerId {
  private constructor(public readonly value: string) {}

  static create(value: string): CustomerId {
    if (!value || value.trim().length === 0) {
      throw new DomainError('INVALID_CUSTOMER_ID', 'CustomerId cannot be empty');
    }
    return new CustomerId(value);
  }

  equals(other: CustomerId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
