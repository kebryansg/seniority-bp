import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LOCAL_KEYS} from "../utils/util";

@Injectable()
export class AutorIdInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authorId = localStorage.getItem(LOCAL_KEYS.AuthorId)
    if (!authorId)
      return next.handle(request)

    // const params = new HttpParams().set('idAuthor', authorId)
    const params = request.params.set('idAuthor', authorId)


    const req = request.clone({
      params
    })
    return next.handle(req);
  }
}
