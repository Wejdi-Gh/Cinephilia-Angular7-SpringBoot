import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public isAuthenticated(): boolean {
    const helper = new JwtHelperService();

    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token) { 

      return !helper.isTokenExpired(token);

    }
    
    return false;
  }
}
