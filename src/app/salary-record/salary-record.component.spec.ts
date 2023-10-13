import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryRecordComponent } from './salary-record.component';

describe('SalaryRecordComponent', () => {
  let component: SalaryRecordComponent;
  let fixture: ComponentFixture<SalaryRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
