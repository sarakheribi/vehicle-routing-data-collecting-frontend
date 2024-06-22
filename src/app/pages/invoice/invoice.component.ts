import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css'
import {HttpClient, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [HttpClientModule, MatIcon, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  providers:[],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements AfterViewInit {
  private map: L.Map | undefined;
  private baseMapUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });
    L.tileLayer(this.baseMapUrl).addTo(this.map);
    //, {
    //       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     }
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  getRoute() {
    const headers = {Authorization: '5b3ce3597851110001cf624815c4852123f54f2a9ba0b86712351e21'};
    this.http.get('https://api.openrouteservice.org/v2/directions/drive-car', {headers})
      .subscribe(data => {
        console.log(data);
        // Verarbeiten Sie die Daten hier, um die Route auf der Karte darzustellen
      });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  goToVehicles() {
    this.router.navigate(['/vehicles']);
  }
}
