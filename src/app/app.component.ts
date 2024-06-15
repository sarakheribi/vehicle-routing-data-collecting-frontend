import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ApiService} from "./services/api-service/api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSlideToggleModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

}
