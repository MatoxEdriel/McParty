import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from './invoice.interface';
import { environment } from '../../env/environment.production';

@Injectable({
  providedIn: 'root'
})

export class InvoicesService {


  private preFix = '/invoice';
  private baseUrl = environment.apiUrl + this.preFix;





  constructor(private http: HttpClient) { }



  downloadPdf(options: { table?: any; html?: string; invoice?: any }) {
    return this.http.post(`${this.baseUrl}/pdf`, options, { responseType: 'blob' });
  }


  getAllInvoices(page: number, limit: number): Observable<any> {

    const params = `?page=${page}&limit=${limit}`;

    return this.http.get<any>(`${this.baseUrl}${params}`);



  }




}
