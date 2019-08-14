import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { UserServiceService } from 'src/app/services/user-service.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  mailExist : boolean =true;
  isSignup : boolean= true ;
  constructor(
    private formBuilder: FormBuilder ,  
    private router: Router , 
    private toastr: ToastrService ,
    private authService: AuthService , 
    private userServiceService  : UserServiceService ) { }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  logInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(response => { 
      this.userServiceService.checkUserExist(response.email).subscribe(data=> {    

      if (response.authToken && JSON.stringify(data.body)==="true") {
        let userCredentials = { username: response.email, password :response.firstName+"001@"}
        this.userServiceService.logIn(userCredentials).subscribe((res:HttpResponse<any>)=>{
    
          if(res.headers.get('Authorization')){
           
            localStorage.setItem('token',res.headers.get('Authorization').split(" ")[1] );
        
            this.toastr.success(' Welcome To Cinephilia', 'Success', {
              enableHtml: true,
              closeButton: true,
              easing: 'ease-in',
              progressBar: true,
              timeOut: 3000
            });
          
            this.router.navigate(['/platform/movies'])
            
            
          }
        })

        
      }
      
      else {

       this.isSignup = false
      }
      
      
    })
      });
  } 
 
  signOut(): void {
    this.authService.signOut();
  }

  checkUserExist () {
  if (this.loginForm.controls.email.value){
    this.userServiceService.checkUserExist(this.loginForm.controls.email.value)
     .subscribe( (Response:HttpResponse<any>) =>  JSON.stringify(Response.body) === "true" ? this.mailExist  = true : this.mailExist = false)  } 
    
     }


onSubmit () {

if (this.loginForm.valid && this.mailExist) {

  let userCredentials = { username: this.loginForm.controls.email.value, password :this.loginForm.controls.password.value }

  this.userServiceService.logIn(userCredentials).subscribe((res:HttpResponse<any>)=>{
    
    if(res.headers.get('Authorization')){
     
      localStorage.setItem('token',res.headers.get('Authorization').split(" ")[1] );
  
      this.router.navigate(['/platform/movies']);


      this.toastr.success(' Welcome To Cinephilia', 'Success', {
        enableHtml: true,
        closeButton: true,
        easing: 'ease-in',
        progressBar: true,
        timeOut: 3000
      });
    }
  });


}

else {
  this.toastr.warning('Please check your pasword and email', 'Warning', {
    enableHtml: true,
    closeButton: true,
    easing: 'ease-in',
    progressBar: true,
    timeOut: 3000
  });

}

}



}
