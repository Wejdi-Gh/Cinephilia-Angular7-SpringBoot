import { Injectable } from '@angular/core';

import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
user : User;
  constructor(private http: HttpClient) { }


  logIn(userCredentials) {

    return this.http.post ('http://localhost:8080/login',  userCredentials ,{observe: 'response' });
    
  }


signup (user:User) {

  return this.http.post ('http://localhost:8080/signup',  user,{observe: 'response'});

}

getAllUsers () {

  return this.http.get('http://localhost:8080/admin/users',{observe: 'response'})

}

checkUserExist (mail) {

  return this.http.get(`http://localhost:8080/signup/${mail}`,{observe: 'response'})

}

updateUser(user:User) {

  return this.http.post ('http://localhost:8080/user/update', user ,{observe: 'response' });


}



}
