import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnswersComponent } from './my-answers.component';

describe('MyAnswersComponent', () => {
  let component: MyAnswersComponent;
  let fixture: ComponentFixture<MyAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
