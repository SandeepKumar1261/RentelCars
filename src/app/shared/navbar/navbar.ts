import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isAdmin: string | null = null;
  isMenuOpen: boolean = false; // for mobile menu toggle

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('in the navbar');
    this.isAdmin = localStorage.getItem('isAdmin');
    console.log('---' + this.isAdmin);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.clear();
    this.isAdmin = null;
    this.isMenuOpen = false;
    this.router.navigate(['/login']);
  }
}
