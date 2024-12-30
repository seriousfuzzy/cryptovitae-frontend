import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProspectosComponent } from './view-prospectos.component';

describe('ViewProspectosComponent', () => {
  let component: ViewProspectosComponent;
  let fixture: ComponentFixture<ViewProspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProspectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
