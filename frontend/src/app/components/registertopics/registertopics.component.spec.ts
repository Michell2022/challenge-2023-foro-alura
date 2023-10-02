import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistertopicsComponent } from './registertopics.component';

describe('RegistertopicsComponent', () => {
  let component: RegistertopicsComponent;
  let fixture: ComponentFixture<RegistertopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistertopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistertopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
