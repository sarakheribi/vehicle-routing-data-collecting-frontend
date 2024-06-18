import { HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service/api.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth-token'); // Get the token from localStorage (or any other storage mechanism)
  const router = inject(Router);
  const apiService = inject(ApiService);
  if (token) {
    const isExpired = jwtDecode(token).exp! < Date.now() / 1000;
    if (isExpired) {
      apiService.logout();

      return next(req);
    }
    // Clone the request and add the authorization header
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Pass the cloned request instead of the original request to the next handle
    return next(clonedReq);
  } else {
    // If no token is found, pass the original request
    return next(req);
  }
};
