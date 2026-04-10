export type FieldType = 'text' | 'number' | 'date' | 'select' | 'lookup' | 'grid' | 'multiselect';

export interface FieldMeta {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  readonly?: boolean;
  lookupTarget?: string;
  gridColumns?: FieldMeta[];
  validations?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormSchema {
  title: string;
  fields: FieldMeta[];
}
