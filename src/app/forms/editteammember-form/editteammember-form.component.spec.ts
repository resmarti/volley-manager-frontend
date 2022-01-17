import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeammemberFormComponent } from './editteammember-form.component';

describe('EditTeammemberFormComponent', () => {
  let component: EditTeammemberFormComponent;
  let fixture: ComponentFixture<EditTeammemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeammemberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeammemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
