import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeammemberFormComponent } from './addteammember-form.component';

describe('EditTeammemberFormComponent', () => {
  let component: AddTeammemberFormComponent;
  let fixture: ComponentFixture<AddTeammemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeammemberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeammemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
