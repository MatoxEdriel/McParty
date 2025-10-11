import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from './invoice.interface';

@Injectable({
  providedIn: 'root'
})

export class InvoicesService {

  private baseUrl = 'http://localhost:3000/api/invoice';

  constructor(private http: HttpClient) { }



  downloadPdfFromHtml(html: string) {
    return this.http.post(`${this.baseUrl}/pdf/html`, { html }, { responseType: 'blob' });
  }

  downloadPdfFromTable(tableData: any) {
    return this.http.post(`${this.baseUrl}/pdf`, tableData, { responseType: 'blob' });
  }
  getAllInvoices(): Observable<Invoice[]> {

    return this.http.get<Invoice[]>(this.baseUrl);

  }




}
