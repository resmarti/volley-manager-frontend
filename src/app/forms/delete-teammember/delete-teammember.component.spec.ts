import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeammemberComponent } from './delete-teammember.component';

describe('DeleteTeammemberComponent', () => {
  let component: DeleteTeammemberComponent;
  let fixture: ComponentFixture<DeleteTeammemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTeammemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTeammemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
