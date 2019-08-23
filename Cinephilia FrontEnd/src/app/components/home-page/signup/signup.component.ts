import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  newUser: User;
  mailExist : boolean = false;
  fBmailExist  = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private userServiceService: UserServiceService

  ) { }

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("^[a-zA-Z]*$")]],
      lastname: ['', [Validators.required, Validators.required, Validators.maxLength(20), Validators.pattern("^[a-zA-Z]*$")]],
      email: ['', [Validators.required, , Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
      confirmEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    }

    );
  }


  checkConfirm(input: string, inputCheck: string) {

    if (input === inputCheck) { return true }


    return false

  }

  signUpWithFB(): void {

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(response => {

      this.userServiceService.checkUserExist(response.email).subscribe(data=> {   

        if (JSON.stringify(data.body)==="false" && response.authToken ) {

          this.newUser = {
  
            mail: response.email,
            password: response.firstName+"001@" ,
            firstName: response.firstName,
            lastName: response.lastName,
            role: {
              id: 2,
              roleName: "USER"
            }
          }
        
          this.userServiceService.signup(this.newUser).subscribe(((Response:HttpResponse<any>) => {

            if (Response.status === 200) {
    
              this.toastr.success('Account Created successfully , Please Login', 'Success', {
                enableHtml: true,
                closeButton: true,
                easing: 'ease-in',
                progressBar: true,
                timeOut: 3000
              });
    
              this.router.navigate(['/cinephilia/login']);
    
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

     else this.fBmailExist = true;

      })
    
    });
  }

  checkUserExist () {

 this.userServiceService.checkUserExist(this.signupForm.controls.email.value)
  .subscribe( (Response:HttpResponse<any>) =>  JSON.stringify(Response.body) === "true" ? this.mailExist  = true : this.mailExist = false) ;  
 
  }
  
  checkUserFBExist (mail) {

    this.userServiceService.checkUserExist(mail)
     .subscribe( (Response:HttpResponse<any>) =>  JSON.stringify(Response.body) === "true" ? this.fBmailExist = true : this.fBmailExist = false) ;  
    
     }


  
  signup() {

    if (this.signupForm.valid && !this.mailExist) {

      this.newUser = {

        mail: this.signupForm.controls.email.value,
        password: this.signupForm.controls.password.value,
        firstName: this.signupForm.controls.firstname.value,
        lastName: this.signupForm.controls.lastname.value,
        role: {
          id: 2,
          roleName: "USER"
        }
      }

      this.userServiceService.signup(this.newUser).subscribe(((Response:HttpResponse<any>) => {

        if (Response.status === 200) {

          this.toastr.success('Account Created successfully , Please Login', 'Success', {
            enableHtml: true,
            closeButton: true,
            easing: 'ease-in',
            progressBar: true,
            timeOut: 3000
          });

          this.router.navigate(['/cinephilia/login']);

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


    else {
      this.toastr.warning('Please check your signup informations', 'Warning', {
        enableHtml: true,
        closeButton: true,
        easing: 'ease-in',
        progressBar: true,
        timeOut: 3000
      });
    }

  }



}
