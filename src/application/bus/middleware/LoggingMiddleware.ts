import { Command, Middleware } from '../CommandBus';

export const loggingMiddleware: Middleware = async (command: Command, next) => {
  const start = Date.now();
  console.log(`[CommandBus] Dispatching: ${command.type}`);
  try {
    const result = await next();
    console.log(`[CommandBus] Completed: ${command.type} in ${Date.now() - start}ms`);
    return result;
  } catch (e) {
    console.error(`[CommandBus] Failed: ${command.type} — ${(e as Error).message}`);
    throw e;
  }
};
