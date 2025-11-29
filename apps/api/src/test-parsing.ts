import { SchwabParser } from './modules/parsing/schwab';

async function test() {
    const parser = new SchwabParser();

    const sampleText = `
    Schwab One® Account
    Account Number 1234-5678
    Statement Period: October 1, 2023 - October 31, 2023
    
    Account Summary
    Cash & Cash Equivalents $ 5,234.50
    
    Positions
    Symbol Description Quantity Price Market Value
    AAPL APPLE INC 100 150.00 15,000.00
    VTI VANGUARD TOTAL STOCK MARKET 500.5 200.00 100,100.00
    CASH CASH 1 1.00 1.00
    TOTAL 115,101.00
  `;

    if (parser.canParse(sampleText)) {
        console.log('Parser matched!');
        const result = await parser.parse(sampleText);
        console.log(JSON.stringify(result, null, 2));
    } else {
        console.log('Parser did not match.');
    }
}

test();
