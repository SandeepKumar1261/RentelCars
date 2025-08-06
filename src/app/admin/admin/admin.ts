import { Component, OnInit } from '@angular/core';
import { Car } from '../../model/car';
import { CarServices } from '../../services/car/car-services';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  pagedCars: Car[] = [];

  showModal: boolean = false;
  selectedCar: Car | null = null;

  // Filtering, Sorting, Pagination
  filter = {
    CarName: '',
    Model: '',
    AvailabilityStatus: '',
    FuelType: '',
  };
  sortOption = '';
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;

  constructor(private carsService: CarServices) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carsService.getCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.filteredCars = data;
        this.applyFilters();
      },
      error: (err) => console.error('CarService error:', err),
    });
  }

  applyFilters() {
    let filtered = this.cars.filter((car) => {
      return (
        (!this.filter.CarName ||
          car.CarName.toLowerCase().includes(
            this.filter.CarName.toLowerCase()
          )) &&
        (!this.filter.Model ||
          car.Model.toLowerCase().includes(this.filter.Model.toLowerCase())) &&
        (!this.filter.AvailabilityStatus ||
          car.AvailabilityStatus === this.filter.AvailabilityStatus) &&
        (!this.filter.FuelType || car.FuelType === this.filter.FuelType)
      );
    });

    switch (this.sortOption) {
      case 'rentAsc':
        filtered.sort((a, b) => a.RentPerDay - b.RentPerDay);
        break;
      case 'rentDesc':
        filtered.sort((a, b) => b.RentPerDay - a.RentPerDay);
        break;
      case 'modelAsc':
        filtered.sort((a, b) => a.Model.localeCompare(b.Model));
        break;
      case 'modelDesc':
        filtered.sort((a, b) => b.Model.localeCompare(a.Model));
        break;
    }

    this.filteredCars = filtered;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredCars.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedCars = this.filteredCars.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.updatePagination();
    }
  }

  openAddModal() {
    this.selectedCar = null;
    this.showModal = true;
  }

  openEditModal(car: Car) {
    this.selectedCar = { ...car };
    this.showModal = true;
  }

  handleSave(car: Car) {
    const formData = new FormData();
    Object.entries(car).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    if (this.selectedCar && this.selectedCar._id) {
      this.carsService.updateCar(this.selectedCar._id, formData).subscribe({
        next: () => {
          this.loadCars();
          this.closeModal();
        },
        error: (err) => console.error('Update error:', err),
      });
    } else {
      if (formData.has('_id')) {
        formData.delete('_id');
      }

      console.log(formData);

      this.carsService.addCar(formData).subscribe({
        next: () => {
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
        next: () => this.loadCars(),
        error: (err) => console.error('Delete error:', err),
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedCar = null;
  }
}
