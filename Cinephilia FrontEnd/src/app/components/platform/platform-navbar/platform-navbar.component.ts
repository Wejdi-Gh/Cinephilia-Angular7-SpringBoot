import { Component, OnInit } from '@angular/core';
import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-platform-navbar',
  templateUrl: './platform-navbar.component.html',
  styleUrls: ['./platform-navbar.component.css'],
  providers: [MessageService]
})
export class PlatformNavbarComponent implements OnInit {
  image : String;
  fullName : String;
  firstName : String;
  lastName: String;
  constructor(private sharedDataServiceService : SharedDataServiceService , private router: Router , private messageService: MessageService ) { }

  ngOnInit() {
    this.deodeToken ();
  }



onChange (shearchData : String) {
this.sharedDataServiceService.shearchDataTransfert(shearchData)
}

logOut() {

  localStorage.removeItem('token');
  this.router.navigate(['/cinephilia']);

}

deodeToken () {
  const token = localStorage.getItem('token');
  const helper = new JwtHelperService();
  const tokenPayload = helper.decodeToken(token);
  this.image= tokenPayload.sub.split(" ")[4]
  this.lastName = tokenPayload.sub.split(" ")[3]
  this.firstName = tokenPayload.sub.split(" ")[2]
  this.fullName=this.lastName+ " "+this.firstName
 
}

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
}

showInfo() {
  this.messageService.add({severity:'info', summary: 'Info Message', detail:'PrimeNG rocks'});
}

showWarn() {
  this.messageService.add({severity:'warn', summary: 'Warn Message', detail:'There are unsaved changes'});
}

showError() {
  this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
}

showCustom() {
  this.messageService.add({key: 'custom', severity:'info', summary: 'Custom Toast', detail:'With a Gradient'});
}

showTopLeft() {
  this.messageService.add({key: 'tl', severity:'info', summary: 'Success Message', detail:'Order submitted'});
}

showTopCenter() {
  this.messageService.add({key: 'tc', severity:'warn', summary: 'Info Message', detail:'PrimeNG rocks'});
}

showConfirm() {
  this.messageService.clear();
  this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}


onConfirm() {
  this.messageService.clear('c');
  this.logOut()
}

onReject() {
  this.messageService.clear('c');
}

clear() {
  this.messageService.clear();
}

}
