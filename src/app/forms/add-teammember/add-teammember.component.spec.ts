import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeammemberComponent } from './add-teammember.component';

describe('AddTeammemberComponent', () => {
  let component: AddTeammemberComponent;
  let fixture: ComponentFixture<AddTeammemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeammemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeammemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
