import { trace, SpanStatusCode, Tracer } from '@opentelemetry/api';
import { SpanHandle, SpanOptions, TracingPort } from '../../domain/ports/output/TracingPort';

class OtelSpanHandle implements SpanHandle {
  constructor(private readonly span: ReturnType<Tracer['startSpan']>) {}

  setAttribute(key: string, value: string | number | boolean): void {
    this.span.setAttribute(key, value);
  }

  recordException(error: Error): void {
    this.span.recordException(error);
  }

  setStatus(status: 'ok' | 'error'): void {
    this.span.setStatus({
      code: status === 'ok' ? SpanStatusCode.OK : SpanStatusCode.ERROR,
    });
  }

  end(): void {
    this.span.end();
  }
}

export class OtelTracingAdapter implements TracingPort {
  private readonly tracer: Tracer;

  constructor(serviceName: string) {
    this.tracer = trace.getTracer(serviceName);
  }

  startSpan(name: string, options?: SpanOptions): SpanHandle {
    const span = this.tracer.startSpan(name, {
      attributes: options?.attributes,
    });
    return new OtelSpanHandle(span);
  }
}
