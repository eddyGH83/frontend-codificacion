import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionLoteDobleAutomaticaComponent } from './supervision-lote-doble-automatica.component';

describe('SupervisionLoteDobleAutomaticaComponent', () => {
  let component: SupervisionLoteDobleAutomaticaComponent;
  let fixture: ComponentFixture<SupervisionLoteDobleAutomaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionLoteDobleAutomaticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisionLoteDobleAutomaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
