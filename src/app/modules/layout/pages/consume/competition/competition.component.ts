import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { IGame } from '../../../../../interface/games-interface';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-competition',
  imports: [
    CommonModule,
    MatCardModule,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss'
})
export class CompetitionComponent {



  // games: IGame[] = [];

games: IGame[] = [
  {
    id: '1',
    name: 'Simón dice',
    description: 'Juego de instrucciones que deben seguirse solo si se dice "Simón dice".',
    participates: ['Niño 1', 'Niño 2'],
    imgUrl: 'assets/img/simon-dice.jpg'
  },
  {
    id: '2',
    name: 'Carrera de sacos',
    description: 'Competencia en la que los niños deben saltar dentro de sacos hasta la meta.',
    participates: [],
    imgUrl: 'assets/img/carrera-sacos.jpg'
  }
];





selectedGame: IGame | null = null;

selectGame(game: IGame){

  this.selectedGame = game;

}





}
