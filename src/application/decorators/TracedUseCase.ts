import { TracingPort } from '../../domain/ports/output/TracingPort';

export function withTracing<TInput, TOutput>(
  useCase: { execute(input: TInput): Promise<TOutput> },
  tracing: TracingPort,
  spanName: string,
): { execute(input: TInput): Promise<TOutput> } {
  return {
    async execute(input: TInput): Promise<TOutput> {
      const span = tracing.startSpan(spanName, {
        attributes: { use_case: spanName },
      });
      try {
        const result = await useCase.execute(input);
        span.setStatus('ok');
        return result;
      } catch (error) {
        if (error instanceof Error) {
          span.recordException(error);
        }
        span.setStatus('error');
        throw error;
      } finally {
        span.end();
      }
    },
  };
}
