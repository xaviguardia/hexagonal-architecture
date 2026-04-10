export interface ProcessContext {
  [key: string]: unknown;
}

export interface ProcessPort {
  startProcess(processId: string, context: ProcessContext): Promise<void>;
}
