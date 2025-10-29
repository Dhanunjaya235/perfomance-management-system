import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsSearchDropdown } from './pms-search-dropdown';

describe('PmsSearchDropdown', () => {
  let component: PmsSearchDropdown;
  let fixture: ComponentFixture<PmsSearchDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmsSearchDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmsSearchDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
