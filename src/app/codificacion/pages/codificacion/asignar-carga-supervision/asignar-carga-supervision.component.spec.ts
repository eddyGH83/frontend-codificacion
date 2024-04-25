import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCargaSupervisionComponent } from './asignar-carga-supervision.component';

describe('AsignarCargaSupervisionComponent', () => {
  let component: AsignarCargaSupervisionComponent;
  let fixture: ComponentFixture<AsignarCargaSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarCargaSupervisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarCargaSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
