import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ApiService } from '../services/api-service/api.service';
import { Router, RouterOutlet } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatButton, NgIf, RouterOutlet, MatIcon],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  user = '';
  isUserLoggedIn = false;

  constructor(private apiService: ApiService) {
    this.apiService.isLoggedIn$
      .pipe(
        switchMap((loggedIn) => {
          this.isUserLoggedIn = loggedIn;
          return this.apiService.username$;
        }),
        tap((username) => (this.user = username)),
      )
      .subscribe();
  }

  logout() {
    this.apiService.logout();
    // this.apiService.username$.subscribe((n) => (this.user = n));
  }
}
