import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisarCodificacionComponent } from './supervisar-codificacion.component';

describe('SupervisarCodificacionComponent', () => {
  let component: SupervisarCodificacionComponent;
  let fixture: ComponentFixture<SupervisarCodificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisarCodificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisarCodificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
