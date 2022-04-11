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

  /**
   * Get Items filter by authorId
   */
  getItems(): Observable<MarvelData[]> {
    return this.http.get<MarvelData[]>(this.apiURL + '', {
      params: {
        idAuthor: "1"
      }
    });
  }

  /**
   * Get Items filter by title and authorId
   * @param title Title
   */
  getItemsByTitle(title: string): Observable<MarvelData[]> {
    return this.http.get<MarvelData[]>(this.apiURL + '', {
      params: {
        title
      }
    });
  }

  /**
   * Create Item
   * @param data Item Data
   */
  create(data: any) {
    return this.http.post(this.apiURL, data)
  }

  /**
   * Update Item By Id
   * @param idItem Id Item
   * @param data Item Data
   */
  update(idItem: string, data: any) {
    return this.http.put(`${this.apiURL}/${idItem}`, data)
  }

  /***
   * Delete Item By Id
   * @param idItem Id Item
   */
  delete(idItem: string) {
    return this.http.delete(`${this.apiURL}/${idItem}`)
  }

}
