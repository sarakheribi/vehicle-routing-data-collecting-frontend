import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import{MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {ApiService} from "../../services/api-service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatCheckbox],
  providers: [],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent implements OnInit {
  public vehicleType: string = "";
  public vehicleDescription: string = "";
  public wheelchair = false;
  public seatingPlaces: string = "";
  public startCoordinateLatitude: string = "";
  public startCoordinateLongitude: string = "";
  public endCoordinateLatitude: string = "";
  public endCoordinateLongitude: string = "";
  public result: any;

  constructor(private apiService: ApiService,
              private router:Router) {
  }

  ngOnInit(): void {
  }

  saveVehicle() {
    const vehicle = {
      vehicleType: this.vehicleType,
      vehicleDescription: this.vehicleDescription,
      canTransportWheelchairs: this.wheelchair,
      seatingPlaces: this.seatingPlaces,
      startCoordinate: {
        longitude: this.startCoordinateLongitude,
        latitude: this.startCoordinateLatitude,
      },
      endCoordinate: {
        longitude: this.endCoordinateLongitude,
        latitude: this.endCoordinateLatitude,
      }
    };
    this.apiService.addVehicle(vehicle)
      .subscribe(() => {
        this.router.navigate(['/vehicles']);
      }
    );

  }
}
