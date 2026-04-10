import { FormSchema } from '../../domain/metadata/FieldMeta';
import { SchemaRepository } from '../../domain/ports/output/SchemaRepository';

export class GetOrderSchemaUseCase {
  constructor(private readonly schemaRepo: SchemaRepository) {}

  async execute(): Promise<FormSchema> {
    const schema = await this.schemaRepo.findByEntity('order');
    if (!schema) {
      throw new Error('Schema not found for entity: order');
    }
    return schema;
  }
}
