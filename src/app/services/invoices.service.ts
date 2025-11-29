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



  downloadPdf(options: { table?: any; html?: string; invoice?: any }) {
    return this.http.post(`${this.baseUrl}/pdf`, options, { responseType: 'blob' });
  }


  getAllInvoices(page: number, limit: number): Observable<any> {

    const params = `?page=${page}&limit=${limit}`;

    return this.http.get<any>(`${this.baseUrl}${params}`);

  }




}
