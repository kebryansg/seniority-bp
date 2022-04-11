import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not permitted enter', () => {
    spyOn(localStorage, 'getItem')
      .and.callFake(() => '1')

    spyOn(guard.router, 'navigate')
      .and.returnValue(null);

    const result = guard.canActivate(null, null)
    expect(result).toBeFalse()
  });

  it('should permitted enter', () => {
    spyOn(localStorage, 'getItem')
      .and.callFake(() => null)

    const result = guard.canActivate(null, null)
    expect(result).toBeTrue()
  });
});
