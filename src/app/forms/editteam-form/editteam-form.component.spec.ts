import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamFormComponent } from './editteam-form.component';

describe('EditteamFormComponent', () => {
  let component: EditTeamFormComponent;
  let fixture: ComponentFixture<EditTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
