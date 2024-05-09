import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupComponent } from './admin-sup.component';

describe('AdminSupComponent', () => {
  let component: AdminSupComponent;
  let fixture: ComponentFixture<AdminSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
