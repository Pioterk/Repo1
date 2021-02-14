import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGneratedReportComponent } from './list-gnerated-report.component';

describe('ListGneratedReportComponent', () => {
  let component: ListGneratedReportComponent;
  let fixture: ComponentFixture<ListGneratedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGneratedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGneratedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
