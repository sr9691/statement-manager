import { Parser, StatementData, Position, Transaction } from './types';

export class SchwabParser implements Parser {
    name = 'Schwab';

    canParse(text: string): boolean {
        return text.includes('Schwab') && (text.includes('Account Number') || text.includes('Account Summary'));
    }

    async parse(text: string): Promise<StatementData> {
        // Extract Account Number
        const accountMatch = text.match(/Account Number\s+([0-9-]+)/i);
        const accountNumber = accountMatch ? accountMatch[1] : 'Unknown';

        // Extract Period
        // Example: "Statement Period: October 1, 2023 - October 31, 2023"
        // This is a simplified regex and might need adjustment based on real PDF layout
        const periodMatch = text.match(/Period:\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})\s+-\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})/i);
        const periodStart = periodMatch ? new Date(periodMatch[1]) : new Date();
        const periodEnd = periodMatch ? new Date(periodMatch[2]) : new Date();

        // Extract Cash Balance
        // Example: "Cash & Cash Equivalents $ 5,000.00"
        const cashMatch = text.match(/Cash\s+&\s+Cash\s+Equivalents\s+\$\s*([\d,]+\.\d{2})/i);
        const cashBalance = cashMatch ? parseFloat(cashMatch[1].replace(/,/g, '')) : 0;

        // Extract Positions
        // This is the hardest part without a structured layout parser.
        // We will look for lines that look like positions: "AAPL APPLE INC 100 150.00 15,000.00"
        // Regex: Symbol (Caps) + Description + Quantity (Number) + Price (Number) + Value (Number)
        const positions: Position[] = [];
        const positionRegex = /([A-Z]{1,5})\s+([A-Z\s\.]+?)\s+(\d+(?:\.\d+)?)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/g;

        let match;
        // We only want to search in the "Positions" section, but for now we search the whole text
        // A better approach is to split text by sections
        while ((match = positionRegex.exec(text)) !== null) {
            // Filter out common false positives (headers, etc)
            if (match[1] === 'TOTAL' || match[1] === 'SYMBOL') continue;

            positions.push({
                symbol: match[1],
                description: match[2].trim(),
                quantity: parseFloat(match[3]),
                price: parseFloat(match[4].replace(/,/g, '')),
                marketValue: parseFloat(match[5].replace(/,/g, '')),
                assetType: 'EQUITY' // Defaulting to Equity for now
            });
        }

        return {
            accountNumber,
            periodStart,
            periodEnd,
            positions,
            transactions: [], // Transactions require a separate regex loop
            cashBalance
        };
    }
}
