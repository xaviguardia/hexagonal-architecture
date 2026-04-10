export interface Command {
  readonly type: string;
}

export interface CommandHandler<C extends Command, R = void> {
  handle(command: C): Promise<R>;
}

export type Middleware = (command: Command, next: () => Promise<unknown>) => Promise<unknown>;

export class CommandBus {
  private handlers = new Map<string, CommandHandler<Command, unknown>>();
  private middlewares: Middleware[] = [];

  register<C extends Command, R>(type: string, handler: CommandHandler<C, R>): void {
    this.handlers.set(type, handler as CommandHandler<Command, unknown>);
  }

  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  async dispatch<R>(command: Command): Promise<R> {
    const handler = this.handlers.get(command.type);
    if (!handler) throw new Error(`No handler registered for command: ${command.type}`);

    const chain = this.middlewares.reduceRight<() => Promise<unknown>>(
      (next, middleware) => () => middleware(command, next),
      () => handler.handle(command),
    );

    return chain() as Promise<R>;
  }
}
