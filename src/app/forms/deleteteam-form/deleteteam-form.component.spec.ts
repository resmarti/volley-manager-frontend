import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeamFormComponent } from './deleteteam-form.component';

describe('DeleteteamFormComponent', () => {
  let component: DeleteTeamFormComponent;
  let fixture: ComponentFixture<DeleteTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTeamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
