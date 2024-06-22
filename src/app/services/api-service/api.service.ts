import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  basePath = 'http://localhost:8081';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _username$ = new BehaviorSubject<string>('');
  username$ = this._username$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    const token = localStorage.getItem('auth-token');
    this._isLoggedIn$.next(!!token);
    this._username$.next(token ? this.getUser() + '' : '');
  }

  login(username: string, password: string) {
    return this.httpClient
      .post(this.basePath + '/auth', {
        username: username,
        password: password,
      })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('auth-token', response.token);
            const username = jwtDecode(response.token).sub;
            this._isLoggedIn$.next(true);
            this._username$.next(username ?? '');
          }
        }),
      );
  }

  private getUser() {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub;
    } else {
      return '';
    }
  }

  logout() {
    localStorage.setItem('auth-token', '');
    this._isLoggedIn$.next(false);
    this._username$.next('');
    this.router.navigate(['/login']);
  }

  public findAllVehicles() {
    return this.httpClient.get(this.basePath + '/vehicles');
  }

  public getVehicle(vehicleId: number) {
    return this.httpClient.get(this.basePath + `/vehicles/${vehicleId}`);
  }

  public addVehicle(vehicle: any) {
    return this.httpClient.post(this.basePath + '/addVehicle', vehicle);
  }

  public deleteVehicle(vehicleId: number) {
    return this.httpClient.delete(
      this.basePath + `/deleteVehicle/${vehicleId}`,
    );
  }

  public updateVehicle(updatedVehicle: any) {
    return this.httpClient.put(
      this.basePath + `/updateVehicle`,
      updatedVehicle,
    );
  }
}
