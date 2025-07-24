import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Car } from '../../model/car';

@Component({
  selector: 'app-add-edit',
  standalone: false,
  templateUrl: './add-edit.html',
  styleUrls: ['./add-edit.css'],
})
export class AddEdit implements OnChanges {
  @Input() car: Car | null = null;
  @Output() save = new EventEmitter<Car>();
  @Output() cancel = new EventEmitter<void>();

  formCar: Car = {
    id: '',
    CarName: '',
    Model: '',
    CarType: '',
    RentPerDay: 0,
    Deposit: 0,
    AvailabilityStatus: 'Available',
    ImageLink: '',
    FuelType: 'Gasoline',
  };

  ngOnChanges(changes: SimpleChanges) {
    console.log('AddEdit ngOnChanges:', changes);
    if (this.car) {
      this.formCar = { ...this.car };
    } else {
      this.resetForm();
    }
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Saving car:', this.formCar);
      this.save.emit(this.formCar);
    } else {
      console.log('Form validation failed');
    }
  }

  onCancel() {
    console.log('Cancel clicked');
    this.cancel.emit();
  }

  validateForm(): boolean {
    const isValid =
      !!this.formCar.CarName &&
      !!this.formCar.Model &&
      !!this.formCar.CarType &&
      this.formCar.RentPerDay > 0 &&
      this.formCar.Deposit > 0 &&
      !!this.formCar.FuelType;
    return isValid;
  }

  resetForm() {
    this.formCar = {
      id: '',
      CarName: '',
      Model: '',
      CarType: '',
      RentPerDay: 0,
      Deposit: 0,
      AvailabilityStatus: 'Available',
      ImageLink: '',
      FuelType: 'Gasoline',
    };
  }
}
