import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStartegiesComponent } from './list-startegies.component';

describe('ListStartegiesComponent', () => {
  let component: ListStartegiesComponent;
  let fixture: ComponentFixture<ListStartegiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStartegiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStartegiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
