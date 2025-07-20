export interface Transaction {
  amount: number;
  category: string;
  title: string;
  description: string;
}

export interface TransactionBrief extends Transaction {
  maxDescriptionLength?: number;
}

export interface TransactionFull extends TransactionBrief {
  date: string;
}
