export interface Position {
    symbol: string;
    description: string;
    quantity: number;
    price: number;
    marketValue: number;
    assetType: 'EQUITY' | 'FIXED_INCOME' | 'CASH' | 'OTHER';
}

export interface Transaction {
    date: Date;
    activity: string;
    symbol?: string;
    amount: number;
    description: string;
}

export interface StatementData {
    accountNumber: string;
    periodStart: Date;
    periodEnd: Date;
    positions: Position[];
    transactions: Transaction[];
    cashBalance: number;
}

export interface Parser {
    name: string;
    canParse(text: string): boolean;
    parse(text: string): Promise<StatementData>;
}
