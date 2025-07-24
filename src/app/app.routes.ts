import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { CompetitionComponent } from './modules/layout/pages/consume/competition/competition.component';
import { FacePaintComponent } from './modules/layout/pages/consume/face-paint/face-paint.component';
import { RegisterRecordFoodComponent } from './modules/layout/pages/consume/register-record-food/register-record-food.component';

// app-routing.module.ts
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      { path: '', component: HomeComponent },
      { path: 'registerFood', component: CompetitionComponent },
      { path: 'face-paint', component: FacePaintComponent}

    ]
  },

  { path: '**', redirectTo: '' } 

  ,
];




