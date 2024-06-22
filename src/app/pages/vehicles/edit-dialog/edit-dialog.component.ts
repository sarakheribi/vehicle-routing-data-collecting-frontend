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
import {Vehicle} from "../../../models/vehicle";

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
    companyName: new FormControl<String>('', Validators.required),
    vehicleType: new FormControl('', Validators.required),
    vehicleDescription: new FormControl(''),
    wheelchair: new FormControl(false, Validators.required),
    seatingPlaces: new FormControl(2, Validators.required),

    startStreetName: new FormControl('', Validators.required),
    startDoorNumber: new FormControl(0, Validators.required),
    startZipCode: new FormControl(0, Validators.required),
    startCity: new FormControl('', Validators.required),

    endStreetName: new FormControl('', Validators.required),
    endDoorNumber: new FormControl(0, Validators.required),
    endZipCode: new FormControl(0, Validators.required),
    endCity: new FormControl('', Validators.required),

  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { vehicle: Vehicle; update: false },
    private dialogRef: MatDialogRef<EditDialogComponent>,
  ) {
    if (this.data.vehicle) {
      this.form.patchValue({
        companyName: this.data.vehicle.companyName+'',
        vehicleType: this.data.vehicle.vehicleType,
        vehicleDescription: this.data.vehicle.vehicleDescription,
        wheelchair: this.data.vehicle.canTransportWheelchairs,
        seatingPlaces: this.data.vehicle.seatingPlaces,

        startStreetName: this.data.vehicle.startCoordinate.streetName,
        startDoorNumber: this.data.vehicle.startCoordinate.doorNumber,
        startZipCode: this.data.vehicle.startCoordinate.zipcode,
        startCity:this.data.vehicle.startCoordinate.streetName,

        endStreetName: this.data.vehicle.startCoordinate.streetName,
        endDoorNumber: this.data.vehicle.startCoordinate.doorNumber,
        endZipCode: this.data.vehicle.startCoordinate.zipcode,
        endCity: this.data.vehicle.startCoordinate.streetName,

      });
    }
  }

  onConfirmSave(): void {
    if (this.form.invalid) {
      return;
    }

    const vehicle = {
      id: this.data.vehicle.id,
      companyName: this.form.get('companyName')?.value,
      vehicleType: this.form.get('vehicleType')?.value,
      vehicleDescription: this.form.get('vehicleDescription')?.value,
      canTransportWheelchairs: this.form.get('wheelchair')?.value,
      seatingPlaces: this.form.get('seatingPlaces')?.value,
      startCoordinate: {
        streetName:this.form.get('startStreetName')?.value,
        doorNumber:this.form.get('startDoorNumber')?.value,
        zipcode:this.form.get('startZipCode')?.value,
        city:this.form.get('startCity')?.value,
      },
      endCoordinate: {
        streetName:this.form.get('endStreetName')?.value,
        doorNumber:this.form.get('endDoorNumber')?.value,
        zipcode:this.form.get('endZipCode')?.value,
        city:this.form.get('endCity')?.value,
      },
    };
    this.dialogRef.close({ vehicle: vehicle, update: true });
  }

  cancel() {
    this.dialogRef.close({ vehicle: undefined, update: false });
  }
}
