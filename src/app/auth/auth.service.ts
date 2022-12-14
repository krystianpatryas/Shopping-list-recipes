import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.module';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();


  signUp(email: string, password: string) {
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBr7E8Tqd6JuZVmEez7tudqxWduKiylM10',
    {
      email: email,
    password: password,
    returnSecureToken: true
  }
  ).pipe(catchError(this.handleError), tap(res => {
    this.handleAuth(res.email, res.localId, res.idToken, +res.expiresIn)
  }))
}

login(email: string, password: string) {
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBr7E8Tqd6JuZVmEez7tudqxWduKiylM10',
  {
    email: email,
    password: password,
    returnSecureToken: true
  }).pipe(catchError(this.handleError),  tap(res => {
    this.handleAuth(res.email, res.localId, res.idToken, +res.expiresIn)
  }));
}

private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  this.user.next(user)

}
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
      switch(errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already'
          break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email doesnt exists'
          break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct'
          break;
      }
      return throwError(errorMessage);
  }


  constructor(private http: HttpClient) { }
}
