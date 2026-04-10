import { ProcessPort, ProcessContext } from '../../domain/ports/output/ProcessPort';

export class ProcessOrderWorkflowUseCase {
  constructor(private readonly processPort: ProcessPort) {}

  async execute(orderId: string): Promise<void> {
    const context: ProcessContext = { orderId };
    await this.processPort.startProcess('process-order', context);
  }
}
