import { Component } from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {ApiService} from "../../services/api-service/api.service";
import { Router } from '@angular/router';
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {of, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatLabel,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: ApiService, private router: Router) {
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }
    this.authService
      .login(this.form.get('username')?.value+'',
        this.form.get('password')?.value+'')
      .subscribe(
        (r) => {
          console.log("r:",r)
          this.router.navigate(['/vehicles']);
        }
      );
/*    this.authService
      .login(this.form.get('username')?.value+'', this.form.get('password')?.value+'')
      .pipe(
        switchMap((token:string) => {
          localStorage.setItem("auth-token","lala");
          if(token){
            localStorage.setItem("auth-token",token);
            return of(this.router.navigate(['/vehicles']));
          }else{
            return of(undefined);
          }
        })
      )
      .subscribe();*/
  }
}
