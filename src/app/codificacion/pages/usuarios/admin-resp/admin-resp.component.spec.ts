import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRespComponent } from './admin-resp.component';

describe('AdminRespComponent', () => {
  let component: AdminRespComponent;
  let fixture: ComponentFixture<AdminRespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRespComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
