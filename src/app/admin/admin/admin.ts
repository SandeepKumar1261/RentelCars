import { Component, OnInit } from '@angular/core';
import { Car } from '../../model/car';
import { CarService } from '../../services/car-service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin implements OnInit {
  cars: Car[] = [];
  showModal: boolean = false;
  selectedCar: Car | null = null;

  constructor(private carsService: CarService) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carsService.getCars().subscribe({
      next: (data) => {
        console.log('Cars loaded:', data);
        this.cars = data;
      },
      error: (err) => console.error('CarService error:', err),
    });
  }

  openAddModal() {
    console.log('Opening add modal');
    this.selectedCar = null;
    this.showModal = true;
    console.log('showModal:', this.showModal);
  }

  openEditModal(car: Car) {
    console.log('Opening edit modal for car:', car);
    this.selectedCar = { ...car };
    this.showModal = true;
    console.log('showModal:', this.showModal);
  }

  handleSave(car: Car) {
    if (this.selectedCar && this.selectedCar.id) {
      this.carsService.updateCar(this.selectedCar.id, car).subscribe({
        next: () => {
          console.log('Car updated:', car);
          this.loadCars();
          this.closeModal();
        },
        error: (err) => console.error('Update error:', err),
      });
    } else {
      // Add new car
      this.carsService.addCar(car).subscribe({
        next: () => {
          console.log('Car added:', car);
          this.loadCars();
          this.closeModal();
        },
        error: (err) => console.error('Add error:', err),
      });
    }
  }

  deleteCar(id: string) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carsService.deleteCar(id).subscribe({
        next: () => {
          console.log('Car deleted:', id);
          this.loadCars();
        },
        error: (err) => console.error('Delete error:', err),
      });
    }
  }

  closeModal() {
    console.log('Closing modal');
    this.showModal = false;
    this.selectedCar = null;
  }
}
