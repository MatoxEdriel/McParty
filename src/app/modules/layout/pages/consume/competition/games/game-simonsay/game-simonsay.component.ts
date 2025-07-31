import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import lottie, { AnimationItem } from 'lottie-web';
import { MatStepperModule } from '@angular/material/stepper';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'
@Component({
  selector: 'app-game-simonsay',
  standalone: true,
  imports: [ MatIconModule ,MatCard, MatStepperModule, CommonModule, MatFormFieldModule, FormsModule],
  templateUrl: './game-simonsay.component.html',
  styleUrls: ['./game-simonsay.component.css']
})
export class GameSimonsayComponent implements AfterViewInit {
  @ViewChild('anim', { static: true }) anim!: ElementRef<HTMLDivElement>;
  @ViewChild('okAnim', { static: true }) okAnim!: ElementRef<HTMLDivElement>;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  newParticipant = '';
  participants: string[] = [];
  stars = Array(5);

  animation!: AnimationItem;
  okAnimation!: AnimationItem;


  constructor(private fb: FormBuilder) {
    this.firstFormGroup = this.fb.group({});
    this.secondFormGroup = this.fb.group({});
  }

  addParticipant() {
    if (this.newParticipant.trim()) {
      this.participants.push(this.newParticipant.trim());
      this.newParticipant = '';
    }
  }

  ngAfterViewInit(): void {
    this.animation = lottie.loadAnimation({
      container: this.anim.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'lottie/compass.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      }
    });

    this.okAnimation = lottie.loadAnimation({
      container: this.okAnim.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'lottie/ok.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      }
    });
  }
}
