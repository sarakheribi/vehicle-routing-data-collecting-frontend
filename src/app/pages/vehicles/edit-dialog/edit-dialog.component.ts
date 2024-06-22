import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatInput } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    MatCheckbox,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatButton,
    MatCard,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
})
export class EditDialogComponent {
  form = new FormGroup({
    companyName: new FormControl(null, Validators.required),
    vehicleType: new FormControl(null, Validators.required),
    vehicleDescription: new FormControl(null),
    wheelchair: new FormControl(false, Validators.required),
    seatingPlaces: new FormControl(2, Validators.required),
    startCoordinateLatitude: new FormControl(null, Validators.required),
    startCoordinateLongitude: new FormControl(null, Validators.required),
    endCoordinateLatitude: new FormControl(null, Validators.required),
    endCoordinateLongitude: new FormControl(null, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { vehicle: any; update: false },
    private dialogRef: MatDialogRef<EditDialogComponent>,
  ) {
    if (this.data.vehicle) {
      this.form.patchValue({
        companyName: this.data.vehicle.companyName,
        vehicleType: this.data.vehicle.vehicleType,
        vehicleDescription: this.data.vehicle.vehicleDescription,
        wheelchair: this.data.vehicle.canTransportWheelchairs,
        seatingPlaces: this.data.vehicle.seatingPlaces,
        startCoordinateLatitude: this.data.vehicle.startCoordinate?.latitude,
        startCoordinateLongitude: this.data.vehicle.startCoordinate?.longitude,
        endCoordinateLatitude: this.data.vehicle.endCoordinate?.latitude,
        endCoordinateLongitude: this.data.vehicle.endCoordinate?.longitude,
      });
    }
  }

  onConfirmSave(): void {
    if (this.form.invalid) {
      return;
    }

    const vehicle = {
      id: this.data.vehicle.id,
      vehicleType: this.form.get('vehicleType')?.value,
      companyName: this.form.get('companyName')?.value,
      vehicleDescription: this.form.get('vehicleDescription')?.value,
      canTransportWheelchairs: this.form.get('wheelchair')?.value,
      seatingPlaces: this.form.get('seatingPlaces')?.value,
      startCoordinate: {
        longitude: this.form.get('startCoordinateLongitude')?.value,
        latitude: this.form.get('startCoordinateLatitude')?.value,
      },
      endCoordinate: {
        longitude: this.form.get('endCoordinateLongitude')?.value,
        latitude: this.form.get('endCoordinateLatitude')?.value,
      },
    };
    this.dialogRef.close({ vehicle: vehicle, update: true });
  }

  cancel() {
    this.dialogRef.close({ vehicle: undefined, update: false });
  }
}
