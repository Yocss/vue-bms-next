export interface ButtonType {
  title: string;
  action: string;
}

export interface EventType {
  action: string;
  [key: string]: unknown;
}
