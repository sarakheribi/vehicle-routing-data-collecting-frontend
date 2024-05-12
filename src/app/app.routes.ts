import { Routes } from '@angular/router';
import {AddVehicleComponent} from "./pages/add-vehicle/add-vehicle.component";
import {MapComponent} from "./map/map.component";

export const routes: Routes = [
  { path: '', component: AddVehicleComponent },
  { path: 'map', component: MapComponent }

];
