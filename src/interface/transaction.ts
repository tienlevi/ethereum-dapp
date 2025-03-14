export interface Transaction {
  id?: string;
  address: string;
  amount?: number;
  hash: string;
  date: string;
  status?: "completed" | "failed" | "pending";
}
