import {CanActivateFn, Router} from '@angular/router';
import {ApiService} from "../services/api-service/api.service";
import {inject} from "@angular/core";
import {tap} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);
  const token = localStorage.getItem('auth-token'); // Get the token from localStorage (or any other storage mechanism)
  console.log("guard tokeN:",token)

  if(token){
    return true;
  }else{
    router.navigate(['login']);
    return false;
  }
/*  return apiService.isLoggedIn$.pipe(
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['login']);
      }
    })
  );*/
};
