import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthRequest, AuthResponse} from '../interfaces/auth';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {LOCAL_KEYS} from "../utils/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = environment.apiAuth;

  constructor(private http: HttpClient) {
  }

  createAccount(data: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiURL + 'signup', {...data});
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiURL + 'login', {...data})
  }

  outLogin() {
    localStorage.removeItem(LOCAL_KEYS.AuthorId)
    localStorage.removeItem(LOCAL_KEYS.JWT)
  }

}
