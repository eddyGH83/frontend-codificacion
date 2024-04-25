import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodificacionSimpleComponent } from './codificacion-simple.component';

describe('CodificacionSimpleComponent', () => {
  let component: CodificacionSimpleComponent;
  let fixture: ComponentFixture<CodificacionSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodificacionSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodificacionSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
