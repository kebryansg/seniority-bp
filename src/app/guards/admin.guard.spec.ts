import {TestBed} from '@angular/core/testing';

import {AdminGuard} from './admin.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {LOCAL_KEYS} from "../utils/util";

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not permitted enter', () => {
    spyOn(localStorage,'getItem').and
      .callFake(() => null)
    const result = guard.canActivate(null, null)

    expect(result).toBeFalse()
  });

  it('should permitted enter', () => {
    spyOn(localStorage,'getItem').and
      .callFake(() => '1')
    const result = guard.canActivate(null, null)

    expect(result).toBeTrue()
  });
});
