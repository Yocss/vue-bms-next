interface ButtonProps {
  disabled?: boolean;
  ghost?: boolean;
  htmlType?: string;
  loading?: boolean;
  shape?: 'circle' | 'round';
  size?: 'large' | 'small';
  type?: 'primary' | 'default' | 'dashed' | 'link';
  block?: boolean;
  icon?: unknown;
}
export interface ButtonType {
  title: string;
  action: string;
  props?: ButtonProps;
  data?: unknown;
}

export interface EventType {
  action: string;
  data: unknown;
  [key: string]: unknown;
}

export interface PaginationType {
  current: number;
  pageSize: number;
  total: number;
}
export interface BasePageBtnType {
  hd?: Array<ButtonType>;
  ft?: Array<ButtonType>;
}
export interface BasePagePropsType {
  buttons?: BasePageBtnType;
  pagination: PaginationType;
}
