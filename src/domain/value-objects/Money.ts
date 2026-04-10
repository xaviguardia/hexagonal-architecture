import { DomainError } from '../errors/DomainError';

export type Currency = 'EUR' | 'USD' | 'GBP';

export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: Currency,
  ) {}

  static of(amount: number, currency: Currency): Money {
    if (amount < 0) {
      throw new DomainError('NEGATIVE_AMOUNT', 'Money amount cannot be negative');
    }
    return new Money(amount, currency);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new DomainError('CURRENCY_MISMATCH', 'Cannot add money of different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  toString(): string {
    return `${this.amount} ${this.currency}`;
  }
}
