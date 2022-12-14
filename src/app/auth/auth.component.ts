import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoading = false;
  isLoginMode = true;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) { return }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;
      if(this.isLoginMode) {
     authObs = this.authService.login(email,password)
    } else {
      authObs = this.authService.signUp(email,password)
    }
    authObs.subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

    form.reset();
  }
}
