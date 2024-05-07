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

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatCheckbox],
  providers: [],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent implements OnInit {
  public vehicleDescription: string = "";
  public wheelchair = false;
  public seatingPlaces: string = "";
  public result: any;

  constructor(private apiService: ApiService ) {
  }

  ngOnInit(): void {
  }

  saveVehicle() {
    var vehicle = {
      vehicleDescription: this.vehicleDescription,
      canTransportWheelchairs: this.wheelchair,
      seatingPlaces: this.seatingPlaces
    }
    this.apiService.addVehicle(vehicle).subscribe();
  }
}
