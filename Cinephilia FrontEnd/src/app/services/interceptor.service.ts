import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }

  intercept(req, next) {
  const token = localStorage.getItem('token');
    if(token ){
  
let tokenizedReq = req.clone({
  setHeaders: {
    Authorization: 'Bearer '+token
  }
});


return next.handle(tokenizedReq);
}
else return next.handle(req);
    
  }

}
