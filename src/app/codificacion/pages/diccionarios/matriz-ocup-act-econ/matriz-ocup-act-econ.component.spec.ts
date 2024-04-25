import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizOcupActEconComponent } from './matriz-ocup-act-econ.component';

describe('MatrizOcupActEconComponent', () => {
  let component: MatrizOcupActEconComponent;
  let fixture: ComponentFixture<MatrizOcupActEconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizOcupActEconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrizOcupActEconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
