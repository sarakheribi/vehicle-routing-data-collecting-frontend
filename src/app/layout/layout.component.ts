import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {ApiService} from "../services/api-service/api.service";
import {Router, RouterOutlet} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  user = "";
  isUserLoggedIn = false;
  constructor(private apiService: ApiService, private router:Router) {
    this.user = apiService.getUser() ?? '';
    this.apiService.isLoggedIn$.pipe(
      tap((isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
      })
    ).subscribe();
  }
  handleToggleChange(){
    console.log("This is a test");
  }
  logout(){
    this.apiService.logout();
    this.user = this.apiService.getUser() ?? '';
  }
}
