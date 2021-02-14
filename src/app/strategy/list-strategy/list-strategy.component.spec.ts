import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStrategyComponent } from './list-strategy.component';

describe('ListStrategyComponent', () => {
  let component: ListStrategyComponent;
  let fixture: ComponentFixture<ListStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
