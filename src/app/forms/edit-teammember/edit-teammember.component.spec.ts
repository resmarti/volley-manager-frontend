import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeammemberComponent } from './edit-teammember.component';

describe('EditTeammemberComponent', () => {
  let component: EditTeammemberComponent;
  let fixture: ComponentFixture<EditTeammemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeammemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeammemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
