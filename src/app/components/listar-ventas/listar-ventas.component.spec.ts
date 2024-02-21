import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVentasComponent } from './listar-ventas.component';

describe('ListarVentasComponent', () => {
  let component: ListarVentasComponent;
  let fixture: ComponentFixture<ListarVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
