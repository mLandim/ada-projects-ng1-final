import { Injectable } from '@angular/core';
import { TOKEN_KEY, USER_KEY, PERFIL_KEY } from '../models/constants';
import { LoggedUser, UserGroup } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor() { }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY)
  }

  setToken(token: string) : void {
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }

  removeToken(): void {
    window.sessionStorage.removeItem(TOKEN_KEY)
  }

  getUser(): string | null {
    return window.sessionStorage.getItem(USER_KEY)
  }

  setUser(user: string) : void {
    window.sessionStorage.setItem(USER_KEY, user)
  }

  removeUser(): void {
    window.sessionStorage.removeItem(USER_KEY)
  }

  getPerfil(): UserGroup | null {
    return <UserGroup>window.sessionStorage.getItem(PERFIL_KEY)
  }

  setPerfil(perfil: UserGroup) : void {
    window.sessionStorage.setItem(PERFIL_KEY, perfil)
  }

  removePerfil(): void {
    window.sessionStorage.removeItem(PERFIL_KEY)
  }


  setLoginAll(user: string, token: string, perfil: UserGroup){
    this.setUser(user)
    this.setToken(token)
    this.setPerfil(perfil)
  }


  logoutUser() {
    this.removeUser()
    this.removeToken()
    this.removePerfil()
  }
}
