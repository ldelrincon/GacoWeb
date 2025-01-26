import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoModalComponent } from './seguimiento-modal.component';

describe('SeguimientoModalComponent', () => {
  let component: SeguimientoModalComponent;
  let fixture: ComponentFixture<SeguimientoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeguimientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
