import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsManagementComponent } from './lists-management.component';

describe('ListsManagementComponent', () => {
  let component: ListsManagementComponent;
  let fixture: ComponentFixture<ListsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
