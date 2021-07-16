import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Supermarket';
  constructor(private router: Router) {

  }
  search(): void {
    var nombre = (document.getElementById("nombres") as HTMLInputElement).value;
    this.router.navigate(['/home/search/' + nombre]);
  }
}
