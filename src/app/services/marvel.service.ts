import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarvelData} from '../interfaces/marvel';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private apiURL = environment.apiMarvel;

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<MarvelData[]> {
    return this.http.get<MarvelData[]>(this.apiURL + '', {
      params: {
        idAuthor: "1"
      }
    });
  }

  getItemsByTitle(title: string): Observable<MarvelData[]> {
    return this.http.get<MarvelData[]>(this.apiURL + '', {
      params: {
        title
      }
    });
  }

  create(data: any) {
    return this.http.post(this.apiURL, data)
  }

  update(idItem: string, data: any) {
    return this.http.put(`${this.apiURL}/${idItem}`, data)
  }

  delete(idItem: string) {
    return this.http.delete(this.apiURL + idItem)
  }

}
