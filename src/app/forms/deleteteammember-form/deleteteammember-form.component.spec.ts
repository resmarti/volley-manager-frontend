import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeammemberFormComponent } from './deleteteammember-form.component';

describe('DeleteTeammemberFormComponent', () => {
  let component: DeleteTeammemberFormComponent;
  let fixture: ComponentFixture<DeleteTeammemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTeammemberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTeammemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
