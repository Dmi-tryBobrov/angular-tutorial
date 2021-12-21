import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStaffComponent } from './top-staff.component';

describe('TopStaffComponent', () => {
  let component: TopStaffComponent;
  let fixture: ComponentFixture<TopStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
