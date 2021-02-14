import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDatapointComponent } from './list-datapoint.component';

describe('ListDatapointComponent', () => {
  let component: ListDatapointComponent;
  let fixture: ComponentFixture<ListDatapointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDatapointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDatapointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
