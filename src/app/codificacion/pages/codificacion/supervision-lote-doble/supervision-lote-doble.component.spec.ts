import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionLoteDobleComponent } from './supervision-lote-doble.component';

describe('SupervisionLoteDobleComponent', () => {
  let component: SupervisionLoteDobleComponent;
  let fixture: ComponentFixture<SupervisionLoteDobleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionLoteDobleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisionLoteDobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
