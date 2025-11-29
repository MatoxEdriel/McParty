import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { InvoicesComponent } from "../invoices/invoices.component";
import { MaterialSelectComponent } from '../../../../../shared/components/MaterialSelect/MaterialSelect.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-face-paint',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    InvoicesComponent,
    MaterialSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './face-paint.component.html',
  styleUrl: './face-paint.component.scss'
})
export class FacePaintComponent implements OnInit {

  form!: FormGroup;


  users = [
    { id: 1, name: 'Gabriel Campoverde' },
    { id: 2, name: 'Juan Pérez' },
    { id: 3, name: 'María González' },
  ];

  boysFacePaints = [
    { name: 'Superhéroe', image: 'assets/facepaint/boy-hero.png' },
    { name: 'Animal', image: 'assets/facepaint/boy-animal.png' }
  ];


  girlsFacePaints = [
    { name: 'Mariposa', image: 'assets/facepaint/girl-butterfly.png' },
    { name: 'Princesa', image: 'assets/facepaint/girl-princess.png' }
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      userId: new FormControl(null)
    });
  }

  onUserChange(value: any) {
    console.log('Usuario seleccionado:', value);
  }
}