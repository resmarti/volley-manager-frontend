import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeammemberToTeamFormComponent } from './add-teammember-to-team-form.component';

describe('AddTeammemberToTeamFormComponent', () => {
  let component: AddTeammemberToTeamFormComponent;
  let fixture: ComponentFixture<AddTeammemberToTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeammemberToTeamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeammemberToTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
