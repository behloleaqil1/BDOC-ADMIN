import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationExpansionPanelComponent } from './navigation-expansion-panel.component';

describe('NavigationExpansionPanelComponent', () => {
  let component: NavigationExpansionPanelComponent;
  let fixture: ComponentFixture<NavigationExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationExpansionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
