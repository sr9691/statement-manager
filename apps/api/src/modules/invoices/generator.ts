import { Invoice, InvoiceItem, ClientProfile } from '@prisma/client';
// In a real app, we would import puppeteer or playwright here
// import puppeteer from 'puppeteer';

export class InvoiceGenerator {

    generateHtml(invoice: Invoice, items: InvoiceItem[], client: ClientProfile): string {
        const total = items.reduce((sum, item) => sum + Number(item.amount), 0);

        return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .table { width: 100%; border-collapse: collapse; }
          .table th, .table td { border-bottom: 1px solid #ddd; padding: 10px; text-align: left; }
          .total { font-weight: bold; font-size: 1.2em; margin-top: 20px; text-align: right; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>INVOICE</h1>
            <p>Invoice ID: ${invoice.id}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <h3>Bill To:</h3>
            <p>${client.firstName} ${client.lastName}</p>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>$${Number(item.amount).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total">
          Total: $${total.toFixed(2)}
        </div>
      </body>
      </html>
    `;
    }

    async generatePdf(html: string): Promise<Buffer> {
        // Mock PDF generation
        console.log('Generating PDF from HTML...');
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.setContent(html);
        // const pdf = await page.pdf({ format: 'A4' });
        // await browser.close();
        // return pdf;

        return Buffer.from('Mock PDF Content');
    }
}
