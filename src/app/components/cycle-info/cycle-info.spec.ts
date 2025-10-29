import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleInfo } from './cycle-info';

describe('CycleInfo', () => {
  let component: CycleInfo;
  let fixture: ComponentFixture<CycleInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
