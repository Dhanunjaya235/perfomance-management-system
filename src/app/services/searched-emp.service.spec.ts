import { TestBed } from '@angular/core/testing';

import { SearchedEmpService } from './searched-emp.service';

describe('SearchedEmpService', () => {
  let service: SearchedEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchedEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
