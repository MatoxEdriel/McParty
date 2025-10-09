import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import lottie, { AnimationItem } from 'lottie-web';


@Component({
  selector: 'app-welcome-lobby',
  standalone: true,
  imports: [
    
    
  ],
  templateUrl: './welcome-lobby.component.html',
  styleUrls: ['./welcome-lobby.component.scss']
})
export class WelcomeLobbyComponent implements AfterViewInit {
  @ViewChild('anim', { static: true }) anim!: ElementRef<HTMLDivElement>;
  animation!: AnimationItem;

  sessionUrl = 'https://mcparty.com/join/ABC123';

  ngAfterViewInit(): void {
    this.animation = lottie.loadAnimation({
      container: this.anim.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'lottie/confetti.json'
    });
  }


}
