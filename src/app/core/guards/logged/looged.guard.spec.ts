import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loogedGuard } from './looged.guard';

describe('loogedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loogedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
