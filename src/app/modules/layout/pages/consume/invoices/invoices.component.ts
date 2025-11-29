import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../../../../../services/invoices.service';
import { CommonModule, NgForOf } from '@angular/common';
import { windowWhen } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TemplateService } from '../../../../../services/template.service';
import { Title } from '@angular/platform-browser';
import { TableData } from '../../../../../shared/interfaces/pdf.interface';




@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  imports: [NgForOf, CommonModule],
  standalone: true

})


export class InvoicesComponent implements OnInit {

  invoices: any[] = []
  currentPage = 1;
  limit = 10;
  totalPages = 0;
  totalRecords = 0;
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



  downloadPdfFromTable() {
    if (!this.tableData) return;
    const payload = {
      ...this.tableData,
      headerBgColor: '#28a745',
      headerTextColor: '#ffffff'
    }

    this.invoicesServices.downloadPdf({ table: payload })
      .subscribe(blob => this.downloadBlob(blob, 'facturas.pdf'));
  }


  downloadInvoicePdf(invoice: any) {
    const html = `
  <div style="width:800px; margin:auto; padding:30px; font-family: 'Arial', sans-serif; color:#333; border:1px solid #ddd; border-radius:10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="display:flex; justify-content:space-between; align-items:center; background:#007bff; color:#fff; padding:20px; border-radius:10px 10px 0 0;">
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_NIKE.svg" width="100" alt="Logo" />
      </div>
      <div style="text-align:right;">
        <h1 style="margin:0; font-size:24px;">Factura #${invoice.InvoiceId}</h1>
        <p style="margin:0; font-size:14px;">Fecha: ${new Date(invoice.InvoiceDate).toLocaleDateString()}</p>
      </div>
    </div>

    <!-- Cliente y dirección -->
    <div style="display:flex; justify-content:space-between; margin-top:20px; padding:0 10px;">
      <div>
        <p style="margin:2px 0;"><strong>Cliente:</strong> ${invoice.CustomerName}</p>
        <p style="margin:2px 0;"><strong>Dirección:</strong> ${invoice.BillingAddress}</p>
        <p style="margin:2px 0;"><strong>Ciudad:</strong> ${invoice.BillingCity}</p>
      </div>
      <div style="text-align:right;">
        <p style="margin:2px 0;"><strong>Teléfono:</strong> ${invoice.CustomerPhone || '-'}</p>
        <p style="margin:2px 0;"><strong>Email:</strong> ${invoice.CustomerEmail || '-'}</p>
      </div>
    </div>

    <!-- Tabla de productos -->
    <table style="width:100%; border-collapse:collapse; margin-top:20px; font-size:14px;">
      <thead>
        <tr style="background-color:#007bff; color:#fff; text-align:left;">
          <th style="padding:10px; border:1px solid #ccc;">Producto</th>
          <th style="padding:10px; border:1px solid #ccc;">Cantidad</th>
          <th style="padding:10px; border:1px solid #ccc;">Precio</th>
          <th style="padding:10px; border:1px solid #ccc;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${(invoice.items ?? []).map((item: any, index: number) => `
          <tr style="background-color:${index % 2 === 0 ? '#f9f9f9' : '#ffffff'};">
            <td style="padding:10px; border:1px solid #ccc;">${item.name}</td>
            <td style="padding:10px; border:1px solid #ccc;">${item.quantity}</td>
            <td style="padding:10px; border:1px solid #ccc;">${item.unitPrice}</td>
            <td style="padding:10px; border:1px solid #ccc;">${item.subtotal}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Total -->
    <div style="text-align:right; margin-top:20px; font-size:18px; font-weight:bold;">
      Total: ${invoice.Total}
    </div>

    <!-- Footer -->
    <div style="text-align:center; margin-top:30px; padding-top:15px; border-top:1px solid #ccc;">
      <img src="${invoice.footerImage || 'assets/img/labra.png'}" style="max-width:200px; margin-bottom:5px;" />
      <p style="font-size:12px; color:#666; margin:0;">Gracias por su compra</p>
    </div>
  </div>
  `;

    this.invoicesServices.downloadPdf({ html })
      .subscribe(blob => this.downloadBlob(blob, `factura_${invoice.InvoiceId}.pdf`));
  }




  ngOnInit() {
    this.loadInvoices();
  }


  loadInvoices(page: number = 1) {
    this.invoicesServices.getAllInvoices(page, this.limit).subscribe({
      next: (response) => {
        this.invoices = response.data.items;
        this.totalRecords = response.data.pagination.total;
        this.totalPages = response.data.pagination.totalPage;
        this.currentPage = response.data.pagination.page;


        this.tableData = {
          columns: [
            'InvoiceId',
            'CustomerId',
            'InvoiceDate',
            'BillingAddress',
            'BillingCity',
            'BillingState',
            'BillingCountry',
            'BillingPostalCode',
            'Total'
          ],
          data: response.data.items
        };
      },
      error: (err) => console.error('Error Cargando Facturas xd', err)

    })
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadInvoices(page);
    }

  }
}


