export interface SpanOptions {
  attributes?: Record<string, string | number | boolean>;
}

export interface TracingPort {
  startSpan(name: string, options?: SpanOptions): SpanHandle;
}

export interface SpanHandle {
  setAttribute(key: string, value: string | number | boolean): void;
  recordException(error: Error): void;
  setStatus(status: 'ok' | 'error'): void;
  end(): void;
}
