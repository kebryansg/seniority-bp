import { TestBed } from '@angular/core/testing';

import { AutorIdInterceptor } from './autor-id.interceptor';

describe('AutorIdInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AutorIdInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AutorIdInterceptor = TestBed.inject(AutorIdInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
