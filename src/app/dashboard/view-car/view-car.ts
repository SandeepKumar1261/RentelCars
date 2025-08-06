import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-car',
  standalone: false,
  templateUrl: './view-car.html',
  styleUrl: './view-car.css',
})
export class ViewCar {
  carId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id');
    // fetch car details from API
  }
}
