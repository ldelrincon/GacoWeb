import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoOTPComponent } from './codigo-otp.component';

describe('CodigoOTPComponent', () => {
  let component: CodigoOTPComponent;
  let fixture: ComponentFixture<CodigoOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodigoOTPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodigoOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
