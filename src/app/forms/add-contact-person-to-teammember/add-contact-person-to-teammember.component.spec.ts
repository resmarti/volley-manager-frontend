import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactPersonToTeammemberComponent } from './add-contact-person-to-teammember.component';

describe('AddContactPersonToTeammemberComponent', () => {
  let component: AddContactPersonToTeammemberComponent;
  let fixture: ComponentFixture<AddContactPersonToTeammemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactPersonToTeammemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactPersonToTeammemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
