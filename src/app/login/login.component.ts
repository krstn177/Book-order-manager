import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! You are getting logged in.';
  alertColor = 'primary';

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ])
  });

  constructor(private authService: AuthService, private router: Router) {

  }
  
  async login(){
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait! You are getting logged in.';
    this.alertColor = 'primary';
    this.authService.login(this.loginForm.value).subscribe({
      next: (retObj) => {
        this.authService.setToken(retObj.accessToken)
        this.alertMsg = 'Success!';
        this.alertColor = 'success';
        setTimeout(async () => {
          await this.router.navigateByUrl('');
        }, 1000)
      },
      error: (errObj) => {
        this.alertMsg = 'Oops! Something went wrong';
        this.alertColor = 'danger';
        console.error(errObj)
      }
    });
  }
}
