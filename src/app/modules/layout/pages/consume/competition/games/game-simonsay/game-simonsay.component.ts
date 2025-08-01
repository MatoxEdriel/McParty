import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import lottie, { AnimationItem } from 'lottie-web';
import { MatStepperModule } from '@angular/material/stepper';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { suggestions } from './suggerest/suggestions.game';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';




@Component({
  selector: 'app-game-simonsay',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatCard,
    MatStepperModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDividerModule],
  templateUrl: './game-simonsay.component.html',
  styleUrls: ['./game-simonsay.component.css'],
  animations: [
    trigger('fadeSuggestion', [
      transition('* => *', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),

  ]
})
export class GameSimonsayComponent implements AfterViewInit {
  @ViewChild('anim', { static: true }) anim!: ElementRef<HTMLDivElement>;
  @ViewChild('okAnim', { static: true }) okAnim!: ElementRef<HTMLDivElement>;
  @ViewChild('write', { static: true }) write!: ElementRef<HTMLDivElement>;


  showSecondForm = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  newParticipant = '';
  participants: string[] = [];
  stars = Array(5);

  animation!: AnimationItem;
  okAnimation!: AnimationItem;
  writeAnimation!: AnimationItem;

  currentSuggestion = '';

  constructor(private fb: FormBuilder) {
    this.firstFormGroup = this.fb.group({});
    this.secondFormGroup = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addParticipant() {
    const name = this.secondFormGroup.get('name')?.value?.trim();
    if (name) {

      this.participants.push(name);
      this.secondFormGroup.reset();

    }


  }

  setRandomSuggestion(): void {

    const index = Math.floor(Math.random() * suggestions.length);
    this.currentSuggestion = suggestions[index];

  }

  handleCardClick() {
    if (!this.showSecondForm) {
      this.showSecondForm = true;
      this.setRandomSuggestion();
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

    this.writeAnimation = lottie.loadAnimation({
      container: this.write.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'lottie/pencil.json',
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
