import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-face-paint',
  imports: [
    CommonModule,
    MatTabsModule
  ],
  templateUrl: './face-paint.component.html',
  styleUrl: './face-paint.component.scss'
})
export class FacePaintComponent {

  boysFacePaints = [
    { name: 'Superhéroe', image: 'assets/facepaint/boy-hero.png' },
    { name: 'Animal', image: 'assets/facepaint/boy-animal.png' },
    // ... más diseños para niños
  ];

  girlsFacePaints = [
    { name: 'Mariposa', image: 'assets/facepaint/girl-butterfly.png' },
    { name: 'Princesa', image: 'assets/facepaint/girl-princess.png' },
    // ... más diseños para niñas
  ];

}
