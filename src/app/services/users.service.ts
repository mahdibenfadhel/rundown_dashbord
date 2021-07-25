import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {JwtService} from './jwt.service';
import {distinctUntilChanged} from 'rxjs/operators';
import {any} from 'codelyzer/util/function';
const currentUserKey = 'user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private isAuthenticatedSubject: ReplaySubject<boolean> = new ReplaySubject<
    boolean
    >(1);
  public isAuthenticated: Observable<
    boolean
    > = this.isAuthenticatedSubject.asObservable();

  constructor(private jwtService: JwtService, private apiService: ApiService) {
    this.currentUserSubject = new BehaviorSubject<any>(
      (JSON.parse(localStorage.getItem(currentUserKey)) || {}) as any
    );
    this.currentUser = this.currentUserSubject
      .asObservable()
      .pipe(distinctUntilChanged());
    const isAuthenticated = this.jwtService.getToken() ? true : false;
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  setAuth(user, token: string): void {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('patient', 'false');
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    // Save user data sent from server in localstorage
    localStorage.setItem(currentUserKey, JSON.stringify(user));
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  updateAuth(user): void {
    localStorage.removeItem(currentUserKey);
    // Set current user to an empty object
    this.currentUserSubject.next({} as any);
    localStorage.setItem(currentUserKey, JSON.stringify(user));
    // Set current user data into observable
    this.currentUserSubject.next(user);
  }

  removeAuth(): void {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Remove user info from localstorage
    localStorage.removeItem(currentUserKey);
    // Set current user to an empty object
    this.currentUserSubject.next({} as any);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
  login(body): Observable<any> {
    return this.apiService.post('api/auth/login', body);
  }
  register(body): Observable<any> {
    return this.apiService.post('api/auth/register', body);
  }

  getUsers(): Observable < any > {
    return this.apiService.get('api/auth/users');
  }
 getUsersSinceLastWeek(): Observable < any > {
    return this.apiService.get('api/auth/usersSinceLastWeek');
  }

}
