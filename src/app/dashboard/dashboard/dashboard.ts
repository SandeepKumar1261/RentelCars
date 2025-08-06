import { Component } from '@angular/core';
import { CarServices } from '../../services/car/car-services';
import { Router } from '@angular/router';
import { Car } from '../../model/car';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css',
})
export class Dashboard {
  cars: Car[] = [];

  constructor(private carService: CarServices, private router: Router) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (data: Car[]) => {
        console.log('Fetched cars:', data);
        this.cars = data;
      },
      error: (err: any) => {
        console.error('Error fetching cars:', err);
      },
    });
  }

  viewCar(id: string) {
    this.router.navigate(['/car', id]);
  }

  buyCar(id: string) {
    // Redirect to payment page or trigger booking flow
    this.router.navigate(['/buy', id]);
  }
}
