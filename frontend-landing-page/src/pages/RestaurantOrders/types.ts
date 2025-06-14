export interface Order extends Record<string, unknown> {
  id: string;
  customerName: string;
  status: string;
  total: number;
  date: string;
  menu: string;
  table: string;
}
