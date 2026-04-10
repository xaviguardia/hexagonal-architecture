import { FormSchema } from '../../../../domain/metadata/FieldMeta';

export interface FormSchemaApiPort {
  fetchSchema(entity: string): Promise<FormSchema>;
}
