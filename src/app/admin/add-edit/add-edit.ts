import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CarServices } from '../../services/car/car-services';

@Component({
  selector: 'app-add-edit',
  standalone: false,
  templateUrl: './add-edit.html',
  styleUrls: ['./add-edit.css'],
})
export class AddEdit implements OnInit, OnDestroy {
  @Input() car: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  formCar: any = {
    CarName: '',
    Model: '',
    CarType: '',
    RentPerDay: 0,
    Deposit: 0,
    FuelType: 'Petrol', // default
    AvailabilityStatus: 'Available', // default
  };

  selectedFile: File | null = null;
  errorMsg: string = '';

  constructor(private carService: CarServices) {}

  ngOnInit(): void {
    if (this.car) {
      this.formCar = { ...this.car };
    }
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    this.errorMsg = '';
    const formData = new FormData();
    formData.append('CarName', this.formCar.CarName);
    formData.append('Model', this.formCar.Model);
    formData.append('CarType', this.formCar.CarType);
    formData.append('RentPerDay', this.formCar.RentPerDay.toString());
    formData.append('Deposit', this.formCar.Deposit.toString());
    formData.append('FuelType', this.formCar.FuelType);
    formData.append('AvailabilityStatus', this.formCar.AvailabilityStatus);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.car?._id) {
      this.carService.updateCar(this.car._id, formData).subscribe({
        next: (res) => {
          this.save.emit(res);
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Failed to update car.';
        },
      });
    } else {
      this.carService.addCar(formData).subscribe({
        next: (res) => {
          this.save.emit(res);
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Failed to add car.';
        },
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onCancel() {
    document.body.style.overflow = '';
    this.cancel.emit();
  }
}
