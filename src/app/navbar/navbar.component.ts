import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string = 'Stock Dashboard';  // Default title

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Listen to route changes to update the navbar title
    this.router.events.subscribe(() => {
      this.updateTitleBasedOnRoute();
    });

    // Initial title update
    this.updateTitleBasedOnRoute();
  }

  updateTitleBasedOnRoute(): void {
    const route = this.router.url;

    if (route.includes('/add-company')) {
      this.title = 'Add Stock Company';
    } else if (route.includes('/all-company')) {
      this.title = 'View and Edit Stock Company';
    } else {
      this.title = 'Stock Dashboard';
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['']);  // Redirect to login page after logout
  }
}
