import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { HomeComponent } from './modules/home/home.component';

// app-routing.module.ts
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      { path: '', component: HomeComponent }
    ]
  },

  { path: '**', redirectTo: '' } 

  ,
];




