import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionLoteSimpleAutomaticaComponent } from './supervision-lote-simple-automatica.component';

describe('SupervisionLoteSimpleAutomaticaComponent', () => {
  let component: SupervisionLoteSimpleAutomaticaComponent;
  let fixture: ComponentFixture<SupervisionLoteSimpleAutomaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionLoteSimpleAutomaticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisionLoteSimpleAutomaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
