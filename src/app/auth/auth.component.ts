import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: [
        '', [Validators.required,
        Validators.email]
    ],
      password: [
        '', [Validators.required,
        Validators.minLength(6)]
      ]
    });
  }

  get email() {return this.authForm.get('email')!;}
  get password() {return this.authForm.get('password')!;}

  back(): void{
    this.location.back();
  }

  signIn(email: string, password: string): void{
    if(!email || !password) {return;}
    console.log(email, password);

    this.authService.authWithEmailPassword(email, password)
    .subscribe(res => {
      this.authService.storeIdToken(res);
      if(!this.authService.redirectUrl)
        this.back();
      else
        this.authService.redirectToGuardedRoute();
    });
  }

}
