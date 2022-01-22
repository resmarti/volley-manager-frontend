import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveContactPersonComponent } from './remove-contact-person.component';

describe('RemoveContactPersonComponent', () => {
  let component: RemoveContactPersonComponent;
  let fixture: ComponentFixture<RemoveContactPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveContactPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
