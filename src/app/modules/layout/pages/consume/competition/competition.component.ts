import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";

@Component({
  selector: 'app-competition',
  imports: [MatTabGroup,
    MatTab
  ],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss'
})
export class CompetitionComponent {

}
