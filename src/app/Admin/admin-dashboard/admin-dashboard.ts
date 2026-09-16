import { Component } from '@angular/core';

import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
// import { AdminProducts } from '../admin-products/admin-products';
@Component({
  selector: 'app-admin-dashboard',
  imports: [Sidebar, RouterOutlet, RouterLinkWithHref],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {}
