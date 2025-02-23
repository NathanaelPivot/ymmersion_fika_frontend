import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucceedPayementComponent } from './succeed-payement.component';

describe('SucceedPayementComponent', () => {
  let component: SucceedPayementComponent;
  let fixture: ComponentFixture<SucceedPayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucceedPayementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucceedPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
