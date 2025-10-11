import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../../../../../services/invoices.service';
import { CommonModule, NgForOf } from '@angular/common';
import { windowWhen } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TemplateService } from '../../../../../services/template.service';


interface TableData {
  columns: string[];
  data: any[];
  headerBgColor?: string;
  headerTextColor?: string;
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  imports: [NgForOf, CommonModule],
  standalone: true

})


export class InvoicesComponent implements OnInit {




  invoices: any[] = []

  tableData!: TableData;
  constructor(private readonly invoicesServices: InvoicesService,
    private http: HttpClient,
    private templateService: TemplateService

  ) { }





  private downloadBlob(pdfBlob: Blob, filename: string) {
    const blob = new Blob([pdfBlob], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  downloadPdf() {
    if (!this.tableData) return;
    this.invoicesServices.downloadPdfFromTable(this.tableData).subscribe((pdfBlob: Blob) => {
      this.downloadBlob(pdfBlob, 'facturas.pdf');
    })
  }
  downloadInvoicePdf(invoice: any) {
    const items = invoice.items ?? []; 

    const html = `
  <div style="width:800px; padding:30px; font-family:sans-serif; color:#333; border:1px solid #ddd;">
    <div style="text-align:center; background-color:#007bff; color:#fff; padding:20px; border-radius:5px 5px 0 0;">
    <img src="http://localhost:3000/assets/img/imagen.png" style="max-width:120px;">
    <h1>Factura #${invoice.InvoiceId}</h1>
    </div>

    <div style="display:flex; justify-content:space-between; margin-top:20px;">
      <div>
        <p><strong>Cliente:</strong> ${invoice.CustomerName}</p>
        <p><strong>Dirección:</strong> ${invoice.BillingAddress}</p>
        <p><strong>Ciudad:</strong> ${invoice.BillingCity}</p>
      </div>
      <div>
        <p><strong>Fecha:</strong> ${new Date(invoice.InvoiceDate).toLocaleDateString()}</p>
      </div>
    </div>

    <table style="width:100%; border-collapse:collapse; margin-top:20px;">
      <thead>
        <tr style="background-color:#007bff; color:#fff;">
          <th style="border:1px solid #ccc; padding:8px;">Producto</th>
          <th style="border:1px solid #ccc; padding:8px;">Cantidad</th>
          <th style="border:1px solid #ccc; padding:8px;">Precio</th>
          <th style="border:1px solid #ccc; padding:8px;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item: any) => `
          <tr>
            <td style="border:1px solid #ccc; padding:8px;">${item.name}</td>
            <td style="border:1px solid #ccc; padding:8px;">${item.quantity}</td>
            <td style="border:1px solid #ccc; padding:8px;">${item.unitPrice}</td>
            <td style="border:1px solid #ccc; padding:8px;">${item.subtotal}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <p style="text-align:right; font-weight:bold; font-size:18px; margin-top:20px;">
      Total: ${invoice.Total}
    </p>

    <div style="text-align:center; margin-top:30px;">
      <img src="${invoice.footerImage || 'assets/img/labra.png'}" style="max-width:200px;">
    </div>
  </div>
  `;

    this.invoicesServices.downloadPdfFromHtml(html).subscribe(pdfBlob => {
      this.downloadBlob(pdfBlob, `factura_${invoice.InvoiceId}.pdf`);
    });
  }

  ngOnInit() {
    this.invoicesServices.getAllInvoices().subscribe({
      next: (data) => {
        this.invoices = data;

        this.tableData = {
          columns: ['InvoiceId', 'CustomerId', 'InvoiceDate', 'BillingCity', 'Total'],
          data: this.invoices.map(inv => ({
            ...inv
          })),
          headerBgColor: '#007bff',
          headerTextColor: '#ffffff'
        };
      },
      error: (err) => console.error("Error al obtener invoices", err)
    });
  }
}
function html2canvas(tempDiv: HTMLDivElement, arg1: { scale: number; }) {
  throw new Error('Function not implemented.');
}

