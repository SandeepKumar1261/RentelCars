import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Car } from '../../model/car';
import { CarService } from '../../services/car-service';

@Component({
  selector: 'app-add-edit',
  standalone: false,
  templateUrl: './add-edit.html',
  styleUrls: ['./add-edit.css'],
})
export class AddEdit {
  @Input() car: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  formCar: any = {
    CarName: '',
    Model: '',
    CarType: '',
    RentPerDay: 0,
    Deposit: 0,
    FuelType: '',
    AvailabilityStatus: 'Available', // ✅ Default
  };

  selectedFile: File | null = null;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    if (this.car) {
      this.formCar = { ...this.car };
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('CarName', this.formCar.CarName);
    formData.append('Model', this.formCar.Model);
    formData.append('CarType', this.formCar.CarType);
    formData.append('RentPerDay', this.formCar.RentPerDay.toString());
    formData.append('Deposit', this.formCar.Deposit.toString());
    formData.append('FuelType', this.formCar.FuelType);
    formData.append('AvailabilityStatus', this.formCar.AvailabilityStatus); // ✅ Include status

    if (this.selectedFile) {
      formData.append('image', this.selectedFile); // field name must match backend
    }

    if (this.car?._id) {
      this.carService.updateCar(this.car._id, formData).subscribe((res) => {
        this.save.emit(res);
      });
    } else {
      this.carService.addCar(formData).subscribe((res) => {
        this.save.emit(res);
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
