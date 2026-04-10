import { HttpFormSchemaAdapter } from '../infrastructure/api/HttpFormSchemaAdapter';
import { ConsoleFormRenderer } from '../infrastructure/ui/ConsoleFormRenderer';
import { LoadAndRenderFormUseCase } from '../application/use-cases/LoadAndRenderFormUseCase';

export function buildFrontendCompositionRoot(baseUrl: string): LoadAndRenderFormUseCase {
  const api = new HttpFormSchemaAdapter(baseUrl);
  const renderer = new ConsoleFormRenderer();
  return new LoadAndRenderFormUseCase(api, renderer);
}
