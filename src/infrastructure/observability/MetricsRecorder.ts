import { metrics, Counter, Histogram } from '@opentelemetry/api';

export class MetricsRecorder {
  private readonly ordersCreated: Counter;
  private readonly useCaseLatency: Histogram;

  constructor(serviceName: string) {
    const meter = metrics.getMeter(serviceName);
    this.ordersCreated = meter.createCounter('orders_created_total', {
      description: 'Total number of orders created',
    });
    this.useCaseLatency = meter.createHistogram('use_case_latency_ms', {
      description: 'Use case execution latency in milliseconds',
      unit: 'ms',
    });
  }

  recordOrderCreated(currency: string): void {
    this.ordersCreated.add(1, { currency });
  }

  recordLatency(useCaseName: string, durationMs: number): void {
    this.useCaseLatency.record(durationMs, { use_case: useCaseName });
  }
}
