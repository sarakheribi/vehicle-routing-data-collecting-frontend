import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css'

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
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

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
