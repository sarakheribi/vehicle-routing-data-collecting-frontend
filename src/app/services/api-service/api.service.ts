import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import { jwtDecode } from "jwt-decode";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  basePath = "http://localhost:8080"
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    const token = localStorage.getItem('auth-token');
    this._isLoggedIn$.next(!!token);
  }

  login(username: string, password: string) {
    return this.httpClient.post(this.basePath + "/auth",
      {
        username: username,
        password: password
      }).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('auth-token', response.token);
      }));
  }

  getUser() {
    const token = localStorage.getItem('auth-token');
    if(token){
      const decodedToken = jwtDecode(token);
      return decodedToken.sub;
    }else{
      return "";
    }

  }
  logout(){
    localStorage.setItem("auth-token","");
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);

  }

  public addVehicle(vehicle: any) {
    return this.httpClient.post(this.basePath + "/addVehicle", vehicle);
  }

  //TODO delete and update


/*  public deleteVehicle(vehicleId: number) {
    return this.httpClient.delete(this.basePath + `/vehicles/${vehicleId}`);
  }

  public updateVehicle(vehicleId: number, updatedVehicle: any) {
    return this.httpClient.put(this.basePath + `/vehicles/${vehicleId}`, updatedVehicle);
  }*/


  public findAllVehicles() {
    return this.httpClient.get(this.basePath + "/vehicles");
  }

}
