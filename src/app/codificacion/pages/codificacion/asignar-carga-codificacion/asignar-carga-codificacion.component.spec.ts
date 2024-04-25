import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCargaCodificacionComponent } from './asignar-carga-codificacion.component';

describe('AsignarCargaCodificacionComponent', () => {
  let component: AsignarCargaCodificacionComponent;
  let fixture: ComponentFixture<AsignarCargaCodificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarCargaCodificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarCargaCodificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
