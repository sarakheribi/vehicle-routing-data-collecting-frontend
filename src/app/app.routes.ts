import {Routes} from '@angular/router';
import {MapComponent} from "./pages/map/map.component";
import {VehiclesComponent} from "./pages/vehicles/vehicles.component";
import {authGuard} from "./guard/auth.guard";
import {LoginComponent} from "./pages/login/login.component";
import {AddVehicleComponent} from "./pages/add-vehicle/add-vehicle.component";
import {LayoutComponent} from "./layout/layout.component";
import {InvoiceComponent} from "./pages/invoice/invoice.component";

export const routes: Routes = [
  {path: '', component: LayoutComponent,
  loadChildren: () => [
    {path: 'login', component: LoginComponent},
    {path: 'vehicles', component: VehiclesComponent, canActivate: [authGuard]},
    {path: 'map', component: MapComponent, canActivate: [authGuard]},
    {path: 'invoice/:vehicle-id', component: InvoiceComponent, canActivate: [authGuard]},
    {path: '**', pathMatch: 'full',redirectTo: 'vehicles'}
  ]},
  {path: '',  pathMatch: 'prefix',redirectTo: ''},
];
