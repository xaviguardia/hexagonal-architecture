import { FormSchema } from '../../../domain/metadata/FieldMeta';
import { RenderOrderFormPort } from '../../domain/ports/input/RenderOrderFormPort';

export class ConsoleFormRenderer implements RenderOrderFormPort {
  render(schema: FormSchema): void {
    console.log(`=== Form: ${schema.title} ===`);
    for (const field of schema.fields) {
      const lookup = field.lookupTarget ? ` -> ${field.lookupTarget}` : '';
      const req = field.required ? '*' : '';
      console.log(`  [${field.type.toUpperCase()}] ${field.label}${req}${lookup}`);
      if (field.gridColumns) {
        for (const col of field.gridColumns) {
          console.log(`    - [${col.type.toUpperCase()}] ${col.label}`);
        }
      }
    }
  }
}
