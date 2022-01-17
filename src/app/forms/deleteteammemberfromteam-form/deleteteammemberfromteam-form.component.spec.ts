import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTeammemberFromTeamFormComponent } from './deleteteammemberfromteam-form.component';

describe('DeleteTeammemberFromTeamFormComponent', () => {
  let component: DeleteTeammemberFromTeamFormComponent;
  let fixture: ComponentFixture<DeleteTeammemberFromTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTeammemberFromTeamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTeammemberFromTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
