import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecodificacionSimpleComponent } from './recodificacion-simple.component';

describe('RecodificacionSimpleComponent', () => {
  let component: RecodificacionSimpleComponent;
  let fixture: ComponentFixture<RecodificacionSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecodificacionSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecodificacionSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
