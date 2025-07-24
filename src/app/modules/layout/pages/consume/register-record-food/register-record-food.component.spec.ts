import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRecordFoodComponent } from './register-record-food.component';

describe('RegisterRecordFoodComponent', () => {
  let component: RegisterRecordFoodComponent;
  let fixture: ComponentFixture<RegisterRecordFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterRecordFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRecordFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
