import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";
import {ApiService} from "../../services/api-service/api.service";
import {tap} from "rxjs";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    MatCard,
    MatButton
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  vehicles : any[] = [];

  constructor(private apiService:ApiService, private router:Router){
    apiService.findAllVehicles().pipe(tap((r:any) => {
      this.vehicles = r
    })).subscribe();
  }

  navigateToAddVehicle() {
    this.router.navigate(['/addVehicle']);
  }

  deleteVehicle(vehicle: any) {
    //TODO
   // apiService.delete()..
  }

  editVehicle(vehicle: any) {
    //TODO
    // apiService.edit()..
  }
}
