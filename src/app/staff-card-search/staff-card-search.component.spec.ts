import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCardSearchComponent } from './staff-card-search.component';

describe('StaffCardSearchComponent', () => {
  let component: StaffCardSearchComponent;
  let fixture: ComponentFixture<StaffCardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffCardSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
