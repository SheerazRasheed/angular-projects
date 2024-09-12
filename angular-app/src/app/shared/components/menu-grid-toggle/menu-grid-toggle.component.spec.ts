import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGridToggleComponent } from './menu-grid-toggle.component';

describe('MenuGridToggleComponent', () => {
  let component: MenuGridToggleComponent;
  let fixture: ComponentFixture<MenuGridToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuGridToggleComponent]
    });
    fixture = TestBed.createComponent(MenuGridToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
