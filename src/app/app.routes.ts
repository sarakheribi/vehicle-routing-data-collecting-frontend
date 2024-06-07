import { Routes } from '@angular/router';
import {AddVehicleComponent} from "./pages/add-vehicle/add-vehicle.component";
import {MapComponent} from "./map/map.component";
import {HomeComponent} from "./pages/home/home.component";
import {VehiclesComponent} from "./pages/vehicles/vehicles.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'map', component: MapComponent}
];
