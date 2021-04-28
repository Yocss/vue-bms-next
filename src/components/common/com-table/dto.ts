import { ButtonType } from '@/dto'
export interface ComTableHeadType {
  title: string;
  field: string;
  slot?: 'text' | 'image' | 'tag' | 'custom';
  width?: number;
  align?: 'center' | 'left' | 'right';
}
export interface CustomType {
  component: unknown;
  data: unknown;
  props: Record<string, unknown>;
  [key: string]: unknown;
}

export interface TableDataType {
  [key: string]: unknown;
  customTableAction: Array<ButtonType>;
}

export interface ComTablePropsType {
  head: Array<ComTableHeadType>;
  data: Array<TableDataType>;
}
