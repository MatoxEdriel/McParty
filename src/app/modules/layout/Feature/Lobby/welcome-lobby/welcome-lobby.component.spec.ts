import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLobbyComponent } from './welcome-lobby.component';

describe('WelcomeLobbyComponent', () => {
  let component: WelcomeLobbyComponent;
  let fixture: ComponentFixture<WelcomeLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeLobbyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
