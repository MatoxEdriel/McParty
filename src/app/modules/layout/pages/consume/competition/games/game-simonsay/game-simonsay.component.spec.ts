/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GameSimonsayComponent } from './game-simonsay.component';

describe('GameSimonsayComponent', () => {
  let component: GameSimonsayComponent;
  let fixture: ComponentFixture<GameSimonsayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSimonsayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSimonsayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
