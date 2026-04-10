import { PaymentGateway, PaymentResult } from '../../domain/ports/output.ports';

// Simulated Stripe response shape (external model — never leaks to domain)
interface StripeChargeResponse {
  id: string;
  status: 'succeeded' | 'failed';
  failure_code?: string;
}

export class StripePaymentGateway implements PaymentGateway {
  async charge(customerId: string, amount: number, currency: string): Promise<PaymentResult> {
    // Simulate Stripe API call
    const stripeResponse: StripeChargeResponse = await this.callStripeApi(customerId, amount, currency);

    // ACL: translate Stripe model to domain model
    return {
      success: stripeResponse.status === 'succeeded',
      transactionId: stripeResponse.id,
      errorCode: stripeResponse.failure_code,
    };
  }

  private async callStripeApi(customerId: string, amount: number, currency: string): Promise<StripeChargeResponse> {
    // Stub — in real code this would call the Stripe SDK
    console.log(`[Stripe] Charging ${amount} ${currency} for customer ${customerId}`);
    return { id: `ch_${Date.now()}`, status: 'succeeded' };
  }
}
