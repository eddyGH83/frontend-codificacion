import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionIndividualSimpleComponent } from './supervision-individual-simple.component';

describe('SupervisionIndividualSimpleComponent', () => {
  let component: SupervisionIndividualSimpleComponent;
  let fixture: ComponentFixture<SupervisionIndividualSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionIndividualSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisionIndividualSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
