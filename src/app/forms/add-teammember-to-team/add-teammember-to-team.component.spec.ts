import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeammemberToTeamComponent } from './add-teammember-to-team.component';

describe('AddTeammemberToTeamComponent', () => {
  let component: AddTeammemberToTeamComponent;
  let fixture: ComponentFixture<AddTeammemberToTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeammemberToTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeammemberToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
