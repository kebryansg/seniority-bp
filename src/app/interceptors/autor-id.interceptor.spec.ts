import {TestBed} from '@angular/core/testing';
import {AutorIdInterceptor} from './autor-id.interceptor';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MarvelService} from "../services/marvel.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";

describe('AutorIdInterceptor', () => {
  let service: MarvelService;
  let httpMock: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MarvelService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AutorIdInterceptor,
          multi: true,
        },
      ],
    })
  );

  beforeEach(() => {
    service = TestBed.get(MarvelService);
    httpMock = TestBed.get(HttpTestingController);
  })

  it('should add params AuthorId', () => {

    spyOn(localStorage, 'getItem')
      .and.callFake(() => '1')

    service.getItems().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${environment.apiMarvel}?idAuthor=1`);

    expect(httpRequest.request.params.has('idAuthor')).toEqual(true);
  });
});
