import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {Router, CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})

export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthenticationService , public router: Router , private authService: AuthService  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {

if(this.auth.isAuthenticated()){
  const expectedRole:String[] = route.data.expectedRole;
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const tokenPayload = helper.decodeToken(token);

  if(expectedRole.includes(tokenPayload.sub.split(" ")[1].toLowerCase()) ){

    return true
} 
 

else {
  this.router.navigate(['/platform/movies']);
  return false;
}

}
else {
  this.router.navigate(['/cinephilia']);

  return false;
}

}
}