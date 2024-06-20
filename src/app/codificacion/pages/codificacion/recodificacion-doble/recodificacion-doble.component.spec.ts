import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecodificacionDobleComponent } from './recodificacion-doble.component';

describe('RecodificacionDobleComponent', () => {
  let component: RecodificacionDobleComponent;
  let fixture: ComponentFixture<RecodificacionDobleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecodificacionDobleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecodificacionDobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
