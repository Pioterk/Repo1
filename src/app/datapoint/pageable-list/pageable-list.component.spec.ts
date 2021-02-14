import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageableListComponent } from './pageable-list.component';

describe('PageableListComponent', () => {
  let component: PageableListComponent;
  let fixture: ComponentFixture<PageableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
