import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUpUserComponent } from './pick-up-user.component';

describe('PickUpUserComponent', () => {
  let component: PickUpUserComponent;
  let fixture: ComponentFixture<PickUpUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickUpUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
