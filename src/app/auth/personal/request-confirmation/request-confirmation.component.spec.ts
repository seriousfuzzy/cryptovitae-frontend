import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestConfirmationComponent } from './request-confirmation.component';

describe('RequestConfirmationComponent', () => {
  let component: RequestConfirmationComponent;
  let fixture: ComponentFixture<RequestConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
