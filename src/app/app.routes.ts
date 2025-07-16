import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';

export // app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
    
      // más rutas...
    ]
  },
  {
    // path: 'login',
    // component: LoginComponent // login sin layout
  },
  { path: '**', redirectTo: 'dashboard' } // ruta por defecto
];
