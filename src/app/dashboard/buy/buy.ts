import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarServices } from '../../services/car/car-services';

@Component({
  selector: 'app-buy',
  standalone: false,
  templateUrl: './buy.html',
  styleUrl: './buy.css',
})
export class Buy {
  carId: string | null = null;

  constructor(private CarService: CarServices, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id');
  }
}
