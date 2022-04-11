import { TestBed } from '@angular/core/testing';

import { MarvelService } from './marvel.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MarvelService', () => {
  let service: MarvelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MarvelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
