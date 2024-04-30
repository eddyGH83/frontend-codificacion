import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodificacionDobleComponent } from './codificacion-doble.component';

describe('CodificacionDobleComponent', () => {
  let component: CodificacionDobleComponent;
  let fixture: ComponentFixture<CodificacionDobleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodificacionDobleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodificacionDobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
