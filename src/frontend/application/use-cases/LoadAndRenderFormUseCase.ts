import { FormSchemaApiPort } from '../../domain/ports/output/FormSchemaApiPort';
import { RenderOrderFormPort } from '../../domain/ports/input/RenderOrderFormPort';

export class LoadAndRenderFormUseCase {
  constructor(
    private readonly api: FormSchemaApiPort,
    private readonly renderer: RenderOrderFormPort,
  ) {}

  async execute(entity: string): Promise<void> {
    const schema = await this.api.fetchSchema(entity);
    this.renderer.render(schema);
  }
}
