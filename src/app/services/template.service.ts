import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    constructor(private http: HttpClient) { }

    loadInvoiceTemplate(): Observable<string> {
        return this.http.get('assets/template/template-invoice.html', { responseType: 'text' });
    }

    fillTemplate(template: string, invoice: any): string {
        let html = template;

        Object.keys(invoice).forEach(key => {
            if (key !== 'items') {
                const value = invoice[key] ?? '';
                const regex = new RegExp(`{{${key}}}`, 'g');
                html = html.replace(regex, value);
            }
        });

        if (invoice.items?.length) {
            const itemsHtml = invoice.items.map((item: any) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.unitPrice}</td>
          <td>${item.subtotal}</td>
        </tr>
      `).join('');
            html = html.replace(/{{#items}}[\s\S]*{{\/items}}/g, itemsHtml);
        } else {
            html = html.replace(/{{#items}}[\s\S]*{{\/items}}/g, '');
        }

        html = html.replace(/{{headerBgColor}}/g, invoice.headerBgColor ?? '#007bff');
        html = html.replace(/{{headerTextColor}}/g, invoice.headerTextColor ?? '#fff');
        html = html.replace(/{{logoUrl}}/g, invoice.logoUrl ?? 'assets/img/imagen.png');

        return html;
    }

    // TemplateService
    convertImageToBase64(url: string): Promise<string> {
        return fetch(url)
            .then(res => res.blob())
            .then(blob => new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));
    }

    async fillInvoiceWithImages(invoice: any): Promise<string> {
        const template = await this.loadInvoiceTemplate().toPromise();

        const logoBase64 = await this.convertImageToBase64('assets/img/logo.png');
        const footerBase64 = await this.convertImageToBase64('assets/img/footer.png');

        const filled = this.fillTemplate(template!, {
            ...invoice,
            logoUrl: logoBase64,
            footerImage: footerBase64
        });

        return filled;
    }
}