import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTeammemberComponent } from './select-teammember.component';

describe('SelectTeammemberComponent', () => {
  let component: SelectTeammemberComponent;
  let fixture: ComponentFixture<SelectTeammemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTeammemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTeammemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
