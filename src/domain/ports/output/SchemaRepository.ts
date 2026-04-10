import { FormSchema } from '../../metadata/FieldMeta';

export interface SchemaRepository {
  findByEntity(entityName: string): Promise<FormSchema | null>;
}
