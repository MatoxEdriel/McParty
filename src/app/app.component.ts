import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  standalone : true,
  imports: [
    RouterOutlet

],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.scss'

})
export class AppComponent {
  title = 'McParty';





  


}


