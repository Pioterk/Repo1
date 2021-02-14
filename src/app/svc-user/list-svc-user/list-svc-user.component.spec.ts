import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSvcUserComponent } from './list-svc-user.component';

describe('ListSvcUserComponent', () => {
  let component: ListSvcUserComponent;
  let fixture: ComponentFixture<ListSvcUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSvcUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSvcUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
