import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarVentaComponent } from './realizar-venta.component';

describe('RealizarVentaComponent', () => {
  let component: RealizarVentaComponent;
  let fixture: ComponentFixture<RealizarVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealizarVentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealizarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
