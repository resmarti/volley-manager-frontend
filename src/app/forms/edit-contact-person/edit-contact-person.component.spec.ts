import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactPersonComponent } from './edit-contact-person.component';

describe('EditContactPersonComponent', () => {
  let component: EditContactPersonComponent;
  let fixture: ComponentFixture<EditContactPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContactPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
