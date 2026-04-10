import { PaymentGateway, PaymentResult } from '../../domain/ports/output.ports';

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export class CircuitBreakerPaymentGateway implements PaymentGateway {
  private state: CircuitState = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly failureThreshold = 3;
  private readonly timeoutMs = 10000;

  constructor(private readonly inner: PaymentGateway) {}

  async charge(customerId: string, amount: number, currency: string): Promise<PaymentResult> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeoutMs) {
        this.state = 'HALF_OPEN';
        console.log('[CircuitBreaker] State: HALF_OPEN — testing recovery');
      } else {
        console.log('[CircuitBreaker] State: OPEN — fast fail');
        return { success: false, errorCode: 'CIRCUIT_OPEN' };
      }
    }

    try {
      const result = await this.inner.charge(customerId, amount, currency);
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failureCount = 0;
        console.log('[CircuitBreaker] State: CLOSED — recovered');
      }
      return result;
    } catch (e) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      if (this.failureCount >= this.failureThreshold) {
        this.state = 'OPEN';
        console.log(`[CircuitBreaker] State: OPEN — ${this.failureCount} failures`);
      }
      throw e;
    }
  }
}
