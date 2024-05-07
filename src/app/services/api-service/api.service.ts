import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  basePath = "http://localhost:8080"

  constructor(private httpClient: HttpClient) {
  }

  public addVehicle(vehicle:any){
    return this.httpClient.post(this.basePath + "/addVehicle", vehicle);
  }

  public findAllVehicles(){
    return this.httpClient.get(this.basePath + "/vehicles");
  }
}
