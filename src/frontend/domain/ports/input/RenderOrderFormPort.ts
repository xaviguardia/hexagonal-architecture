import { FormSchema } from '../../../../domain/metadata/FieldMeta';

export interface RenderOrderFormPort {
  render(schema: FormSchema): void;
}
