import { ProcessContext, ProcessPort } from '../../domain/ports/output/ProcessPort';
import * as fs from 'fs';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Engine } = require('bpmn-engine') as {
  Engine: new (opts: Record<string, unknown>) => { execute(): Promise<unknown> };
};

type ServiceCallback = (err: Error | null) => void;
type ServiceFn = (executionContext: unknown, callback: ServiceCallback) => void;

export class BpmnProcessAdapter implements ProcessPort {
  private readonly bpmnPath: string;

  constructor(
    private readonly validateDelegate: (context: ProcessContext) => Promise<void>,
    private readonly paymentDelegate: (context: ProcessContext) => Promise<void>,
  ) {
    this.bpmnPath = path.join(process.cwd(), 'bpmn', 'process-order.bpmn');
  }

  async startProcess(processId: string, context: ProcessContext): Promise<void> {
    const source = fs.readFileSync(this.bpmnPath, 'utf8');

    const validate: ServiceFn = (_, callback) => {
      this.validateDelegate(context)
        .then(() => callback(null))
        .catch((err: unknown) => callback(err instanceof Error ? err : new Error(String(err))));
    };

    const payment: ServiceFn = (_, callback) => {
      this.paymentDelegate(context)
        .then(() => callback(null))
        .catch((err: unknown) => callback(err instanceof Error ? err : new Error(String(err))));
    };

    const engine = new Engine({
      name: processId,
      source,
      services: { validate, payment },
    });

    await engine.execute();
  }
}
