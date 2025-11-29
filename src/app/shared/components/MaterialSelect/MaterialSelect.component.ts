import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-material-select',
  standalone: true,
  templateUrl: './MaterialSelect.component.html',
  styleUrls: ['./MaterialSelect.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class MaterialSelectComponent {

  @Input() label!: string;
  @Input() placeholder: string = 'Seleccione';
  @Input() items: any[] = [];
  @Input() control!: FormControl;
  @Input() valueField: string = 'id';
  @Input() displayField: string = 'name';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() changeValue = new EventEmitter<any>();

  onChange(value: any) {
    this.changeValue.emit(value);
  }
}