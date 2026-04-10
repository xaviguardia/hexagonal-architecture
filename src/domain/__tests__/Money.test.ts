import { Money } from '../value-objects/Money';
import { DomainError } from '../errors/DomainError';

describe('Money', () => {
  it('creates money with valid amount', () => {
    const m = Money.of(100, 'EUR');
    expect(m.amount).toBe(100);
    expect(m.currency).toBe('EUR');
  });

  it('throws on negative amount', () => {
    expect(() => Money.of(-1, 'EUR')).toThrow(DomainError);
  });

  it('adds two money values of same currency', () => {
    const result = Money.of(10, 'EUR').add(Money.of(5, 'EUR'));
    expect(result.amount).toBe(15);
  });

  it('throws when adding different currencies', () => {
    expect(() => Money.of(10, 'EUR').add(Money.of(5, 'USD'))).toThrow(DomainError);
  });

  it('compares equality correctly', () => {
    expect(Money.of(100, 'EUR').equals(Money.of(100, 'EUR'))).toBe(true);
    expect(Money.of(100, 'EUR').equals(Money.of(200, 'EUR'))).toBe(false);
  });
});
