import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJturnoComponent } from './admin-jturno.component';

describe('AdminJturnoComponent', () => {
  let component: AdminJturnoComponent;
  let fixture: ComponentFixture<AdminJturnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJturnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
