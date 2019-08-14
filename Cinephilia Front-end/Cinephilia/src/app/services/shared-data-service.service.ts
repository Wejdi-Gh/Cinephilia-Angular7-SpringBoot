import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {

  shearchData: String;

  constructor() { }



shearchDataTransfert(data : String) {

this.shearchData = data ;

}



}
