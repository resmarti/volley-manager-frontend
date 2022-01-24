import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeammemberToEventComponent } from './add-teammember-to-event.component';

describe('AddTeammemberToEventComponent', () => {
  let component: AddTeammemberToEventComponent;
  let fixture: ComponentFixture<AddTeammemberToEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeammemberToEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeammemberToEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
