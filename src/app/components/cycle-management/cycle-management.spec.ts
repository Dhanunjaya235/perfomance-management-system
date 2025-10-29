import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleManagement } from './cycle-management';

describe('CycleManagement', () => {
  let component: CycleManagement;
  let fixture: ComponentFixture<CycleManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
