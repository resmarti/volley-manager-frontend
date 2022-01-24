import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTeammemberFromEventComponent } from './remove-teammember-from-event.component';

describe('RemoveTeammemberFromEventComponent', () => {
  let component: RemoveTeammemberFromEventComponent;
  let fixture: ComponentFixture<RemoveTeammemberFromEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTeammemberFromEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTeammemberFromEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
