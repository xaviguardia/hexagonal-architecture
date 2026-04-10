import { FormSchema } from '../../../domain/metadata/FieldMeta';
import { FormSchemaApiPort } from '../../domain/ports/output/FormSchemaApiPort';

export class HttpFormSchemaAdapter implements FormSchemaApiPort {
  constructor(private readonly baseUrl: string) {}

  async fetchSchema(entity: string): Promise<FormSchema> {
    const res = await fetch(`${this.baseUrl}/${entity}s/schema`);
    if (!res.ok) throw new Error(`Failed to fetch schema for ${entity}`);
    return res.json() as Promise<FormSchema>;
  }
}
