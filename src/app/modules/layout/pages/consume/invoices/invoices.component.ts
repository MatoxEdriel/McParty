import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../../../../../services/invoices.service';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  imports: [NgForOf, CommonModule],
  standalone: true

})
export class InvoicesComponent implements OnInit {

  invoices: any[] = []


  constructor(private readonly invoicesServices: InvoicesService) { }

  ngOnInit() {
    this.invoicesServices.getAllInvoices().subscribe({
      next: (data) => this.invoices = data,
      error: (err) => console.error("errorxd ")

    })

  }

}
