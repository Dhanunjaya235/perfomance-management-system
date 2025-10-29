import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleConfig } from './role-config';

describe('RoleConfig', () => {
  let component: RoleConfig;
  let fixture: ComponentFixture<RoleConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleConfig);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
