import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-account',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {

  private router = inject(Router);

  logout() {
    localStorage.removeItem('authToken');

    this.router.navigate(['/login']);
  }

}
