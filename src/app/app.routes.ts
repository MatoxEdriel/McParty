import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { CompetitionComponent } from './modules/layout/pages/consume/competition/competition.component';
import { FacePaintComponent } from './modules/layout/pages/consume/face-paint/face-paint.component';
import { RegisterRecordFoodComponent } from './modules/layout/pages/consume/register-record-food/register-record-food.component';
import { WelcomeLobbyComponent } from './modules/layout/Feature/Lobby/welcome-lobby/welcome-lobby.component';

// app-routing.module.ts
export const routes: Routes = [
  {
    path: '',
    component: WelcomeLobbyComponent, 
    // component: LayoutComponent,
    children: [

      { path: '', component: HomeComponent },
      { path: 'registerFood', component: RegisterRecordFoodComponent },
      { path: 'face-paint', component: FacePaintComponent},
      { path: 'competition' , component: CompetitionComponent}

    ]
  },

  { path: '**', redirectTo: '' } 

  ,
];




