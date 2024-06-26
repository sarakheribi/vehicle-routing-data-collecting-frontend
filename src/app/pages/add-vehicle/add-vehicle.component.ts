import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { ApiService } from '../../services/api-service/api.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckbox,
    ReactiveFormsModule,
  ],
  providers: [],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
})
export class AddVehicleComponent {
  form = new FormGroup({
    companyName: new FormControl(null, Validators.required),
    vehicleType: new FormControl(null, Validators.required),
    vehicleDescription: new FormControl(null),
    wheelchair: new FormControl(false, Validators.required),
    seatingPlaces: new FormControl(2, Validators.required),

    startStreetName: new FormControl(null, Validators.required),
    startDoorNumber: new FormControl(null, Validators.required),
    startZipCode: new FormControl(null, Validators.required),
    startCity: new FormControl(null, Validators.required),

    endStreetName: new FormControl(null, Validators.required),
    endDoorNumber: new FormControl(null, Validators.required),
    endZipCode: new FormControl(null, Validators.required),
    endCity: new FormControl(null, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: boolean,
    private dialogRef: MatDialogRef<AddVehicleComponent>,
    private apiService: ApiService,
  ) {}

  onConfirmSave(): void {
    if (this.form.invalid) {
      return;
    }

    const vehicle = {
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

    this.apiService.addVehicle(vehicle).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
