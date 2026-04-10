import { FormSchema } from '../../domain/metadata/FieldMeta';
import { SchemaRepository } from '../../domain/ports/output/SchemaRepository';

export class InMemorySchemaRepository implements SchemaRepository {
  private readonly schemas: Map<string, FormSchema> = new Map([
    ['order', {
      title: 'Create Order',
      fields: [
        { name: 'customerId', label: 'Customer',     type: 'lookup', required: true,  lookupTarget: 'customers' },
        { name: 'amount',     label: 'Amount',       type: 'number', required: true,  validations: { min: 0.01 } },
        { name: 'currency',   label: 'Currency',     type: 'select', required: true },
        {
          name: 'items', label: 'Order Items', type: 'grid', required: true,
          gridColumns: [
            { name: 'productId', label: 'Product',  type: 'lookup', required: true, lookupTarget: 'products' },
            { name: 'quantity',  label: 'Quantity', type: 'number', required: true, validations: { min: 1 } },
          ],
        },
      ],
    }],
  ]);

  async findByEntity(entityName: string): Promise<FormSchema | null> {
    return this.schemas.get(entityName) ?? null;
  }
}
