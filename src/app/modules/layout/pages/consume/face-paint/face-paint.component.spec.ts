import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacePaintComponent } from './face-paint.component';

describe('FacePaintComponent', () => {
  let component: FacePaintComponent;
  let fixture: ComponentFixture<FacePaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacePaintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacePaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
