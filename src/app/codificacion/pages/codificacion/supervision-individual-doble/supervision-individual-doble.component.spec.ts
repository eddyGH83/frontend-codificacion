import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionIndividualDobleComponent } from './supervision-individual-doble.component';

describe('SupervisionIndividualDobleComponent', () => {
  let component: SupervisionIndividualDobleComponent;
  let fixture: ComponentFixture<SupervisionIndividualDobleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionIndividualDobleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisionIndividualDobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
