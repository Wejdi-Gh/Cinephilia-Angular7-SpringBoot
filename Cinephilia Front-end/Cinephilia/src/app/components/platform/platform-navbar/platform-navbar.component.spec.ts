import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformNavbarComponent } from './platform-navbar.component';

describe('PlatformNavbarComponent', () => {
  let component: PlatformNavbarComponent;
  let fixture: ComponentFixture<PlatformNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
