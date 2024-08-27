import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`);
  }

  setSession(username: string): void {
    sessionStorage.setItem('username', username);
  }

  logout(): void {
    sessionStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('username');
  }
}
