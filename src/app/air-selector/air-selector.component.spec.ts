import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirSelectorComponent } from './air-selector.component';

describe('AirSelectorComponent', () => {
  let component: AirSelectorComponent;
  let fixture: ComponentFixture<AirSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
