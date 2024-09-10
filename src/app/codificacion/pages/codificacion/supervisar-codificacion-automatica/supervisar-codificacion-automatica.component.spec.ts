import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisarCodificacionAutomaticaComponent } from './supervisar-codificacion-automatica.component';

describe('SupervisarCodificacionAutomaticaComponent', () => {
  let component: SupervisarCodificacionAutomaticaComponent;
  let fixture: ComponentFixture<SupervisarCodificacionAutomaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisarCodificacionAutomaticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisarCodificacionAutomaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
