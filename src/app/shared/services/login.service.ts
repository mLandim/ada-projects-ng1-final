import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL, HTTP_OPTIONS } from '../models/constants';
import { StorageService } from './storage.service';
import { LoggedUser } from '../models/user.interface';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  login(user: string, password: string): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${API_URL}/login`, {
      login: user,
      senha: password
    }, HTTP_OPTIONS).pipe(
      tap(LoggedData => {
        this.storage.setLoginAll(LoggedData.user, LoggedData.token, LoggedData.perfil)
      })
    )
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${API_URL}/logout`).pipe(
      tap(_ => this.storage.logoutUser())
    )
  }

  isLoggedIn(): boolean {
    return this.storage.getToken() ? true : false
  }

  isAdmin(): boolean {
    return this.storage.getPerfil() === "admin"
  }

}
