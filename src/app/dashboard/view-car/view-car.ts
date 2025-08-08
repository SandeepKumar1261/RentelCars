import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarServices } from '../../services/car/car-services';
import { Car } from '../../model/car';

@Component({
  selector: 'app-view-car',
  standalone: false,
  templateUrl: './view-car.html',
  styleUrl: './view-car.css',
})
export class ViewCar {
  carId: string | null = null;
  carDetails: Car | null = null;

  constructor(private route: ActivatedRoute, private carService: CarServices) {}

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id');
    if (this.carId) {
      this.carService.getCarById(this.carId).subscribe({
        next: (car) => {
          this.carDetails = car;
          console.log('Car details:', this.carDetails);
        },
        error: (err) => {
          console.error('Error fetching car details:', err);
        },
      });
    } else {
      console.error('No car ID found in route parameters');
    }
  }
  openContactModal(carData: Car) {}
}
