import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionLoteSimpleComponent } from './supervision-lote-simple.component';

describe('SupervisionLoteSimpleComponent', () => {
  let component: SupervisionLoteSimpleComponent;
  let fixture: ComponentFixture<SupervisionLoteSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionLoteSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisionLoteSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
