import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTeammemberFromTeamComponent } from './remove-teammember-from-team.component';

describe('RemoveTeammemberFromTeamComponent', () => {
  let component: RemoveTeammemberFromTeamComponent;
  let fixture: ComponentFixture<RemoveTeammemberFromTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTeammemberFromTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTeammemberFromTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
