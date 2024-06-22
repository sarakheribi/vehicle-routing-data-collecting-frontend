import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ApiService } from '../../services/api-service/api.service';
import { tap } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { update } from '@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import {Vehicle} from "../../models/vehicle";

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [MatCard, MatButton, MatIcon],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent {
  vehicles: Vehicle[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.loadVehicles();
  }

  private loadVehicles() {
    this.apiService
      .findAllVehicles()
      .pipe(
        tap((r: any) => {
          this.vehicles = r;
        }),
      )
      .subscribe();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddVehicleComponent, {
      data: false,
      width: '100%',
      maxWidth: '500px',
    });

    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        this.loadVehicles();
      } else {
        this.snackBar.open('Error adding vehicle"', 'ok', {
          duration: 2000,
        });
      }
    });
  }

  deleteVehicle(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
    const snack = this.snackBar.open('Deleting vehicle..');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        this.apiService.deleteVehicle(vehicle.id).subscribe(() => {
          this.loadVehicles();
        });
        snack.dismiss();
        this.snackBar.open('Successfully deleted"', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }

  editVehicle(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        vehicle: vehicle,
        update: false,
      },
      width: '100%',
      maxWidth: '500px',
    });

    dialogRef
      .afterClosed()
      .subscribe((data: { vehicle: Vehicle; update: false }) => {
        if (data.update) {
          this.apiService.updateVehicle(data.vehicle).subscribe(() => {
            this.loadVehicles();
          });
          this.snackBar.open('Successfully updated"', 'Fechar', {
            duration: 2000,
          });
        }
      });
  }

  openInvoice(vehicle: Vehicle) {
    this.router.navigate(['/invoice']);
  }
}
