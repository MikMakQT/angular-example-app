import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  headerText = 'Testing Angular Applications';
  private readonly router = inject(Router);

  constructor(/*public router: Router*/) {
    // this is a secret
  }

  ngOnInit(): void {
    console.log('Homecomponent initialized');
  }

  showFeedbackPage(): void {
    this.router.navigate(['feedback']);
  }
}
