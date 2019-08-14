import { Component, OnInit } from '@angular/core';
import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-platform-navbar',
  templateUrl: './platform-navbar.component.html',
  styleUrls: ['./platform-navbar.component.css']
})
export class PlatformNavbarComponent implements OnInit {

  constructor(private sharedDataServiceService : SharedDataServiceService , private router: Router) { }

  ngOnInit() {
  }



onChange (shearchData : String) {
this.sharedDataServiceService.shearchDataTransfert(shearchData)
}

logOut() {

  localStorage.removeItem('token');
  this.router.navigate(['/cinephilia']);

}


}
