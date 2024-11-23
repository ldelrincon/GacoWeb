import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAddComponent } from './productos-add.component';

describe('ProductosAddComponent', () => {
  let component: ProductosAddComponent;
  let fixture: ComponentFixture<ProductosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
