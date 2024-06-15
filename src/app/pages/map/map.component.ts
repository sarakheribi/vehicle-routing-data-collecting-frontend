import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css'
import {HttpClient, HttpClientModule, provideHttpClient} from "@angular/common/http";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule],
  providers:[],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{
  private map: L.Map | undefined;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  constructor(private http: HttpClient) {}

  getRoute() {
    const headers = { Authorization: '5b3ce3597851110001cf624815c4852123f54f2a9ba0b86712351e21' };
    this.http.get('https://api.openrouteservice.org/v2/directions/drive-car', { headers })
      .subscribe(data => {
        console.log(data);
        // Verarbeiten Sie die Daten hier, um die Route auf der Karte darzustellen
      });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
