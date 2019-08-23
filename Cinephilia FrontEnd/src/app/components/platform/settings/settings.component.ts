import { Component, OnInit, Input } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  firstName : String;
  lastName: String;
  email: String;
  fullName : String;
  password : String ="";
  draggedCar;
  updatedUser : User ;
 image : String;
  availableCars= [
  {label:"Last Name", type : "text" , value :this.lastName , name: "lastName"} , 
  {label:"First Name", type : "text", value :this.firstName, name: "firstName"}, 
  {label:"Password", type : "Password", value :"" ,name: "password"}
    ];

  selectedCars = [] ;
 
  constructor( private userServiceService : UserServiceService , private toastr: ToastrService) { }

  ngOnInit() {

   this.deodeToken ();
    
  }
  
  dragStart(event,car) {
    this.draggedCar = car;
}

drop(event) {
    if(this.draggedCar) {
     if(this.draggedCar.label === "Last Name") this.draggedCar.value= this.lastName;
     if(this.draggedCar.label === "First Name") this.draggedCar.value= this.firstName;   

      this.selectedCars = [...this.selectedCars, this.draggedCar];
        this.availableCars = this.availableCars.filter( (el ) => el != this.draggedCar) ;
        this.draggedCar = null;
    }
}

dragEnd(event) {
    this.draggedCar = null;
}


dropInvrse(event) {
  if(this.draggedCar) {
      this.availableCars = [...this.availableCars , this.draggedCar];
      this.selectedCars = this.selectedCars.filter( (el ) => el != this.draggedCar) ;
      this.draggedCar = null;
  }
}

deodeToken () {
  const token = localStorage.getItem('token');
  const helper = new JwtHelperService();
  const tokenPayload = helper.decodeToken(token);
  this.lastName = tokenPayload.sub.split(" ")[3]
  this.firstName = tokenPayload.sub.split(" ")[2]
  this.email= tokenPayload.sub.split(" ")[0]
  this.fullName=this.lastName+ " "+this.firstName
  this.image= tokenPayload.sub.split(" ")[4]
}

updateUser() {

this.updatedUser = {
  
  mail: this.email,
  password: this.password ,
  firstName:  this.firstName,
  lastName:  this.lastName,
  role: {
    id: 2,
    roleName: "USER"
  }
}
this.userServiceService.updateUser(this.updatedUser).subscribe ((response => {
  if (response.status === 200) {
    
    this.toastr.success('Account successfully Updated ', 'Success', {
      enableHtml: true,
      closeButton: true,
      easing: 'ease-in',
      progressBar: true,
      timeOut: 3000
    });

   
  }

}), (err => {
  if (err) {

    this.toastr.error(" We Have a Technical Problem , please try again ", 'Error', {
      enableHtml: true,
      closeButton: true,
      easing: 'ease-in',
      progressBar: true,
      timeOut: 3000
    });

  }
}

  )
)
}

onChange( event ,data ) {

if(data.name ==="lastName" ) { this.lastName=event.target.value}
if(data.name ==="firsttName" ) { this.firstName=event.target.value}
if(data.name ==="password" ) { this.password=event.target.value}

}
}
