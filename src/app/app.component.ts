import { Component } from '@angular/core';
import {RouterOutlet, withNavigationErrorHandler} from '@angular/router';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

// kommentar test
export class AppComponent {
  title = 'dke-pr-vehicle-routing-frontend';
  handleToggleChange(){
    console.log("This is a test");
  }

  protected readonly withNavigationErrorHandler = withNavigationErrorHandler;
}
