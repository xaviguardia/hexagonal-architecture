import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';

let sdk: NodeSDK | null = null;

export function initTelemetry(serviceName: string): void {
  sdk = new NodeSDK({
    serviceName,
    traceExporter: new ConsoleSpanExporter(),
  });
  sdk.start();
}

export async function shutdownTelemetry(): Promise<void> {
  await sdk?.shutdown();
}
