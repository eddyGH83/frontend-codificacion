import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceCodificacionComponent } from './avance-codificacion.component';

describe('AvanceCodificacionComponent', () => {
  let component: AvanceCodificacionComponent;
  let fixture: ComponentFixture<AvanceCodificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvanceCodificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvanceCodificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
