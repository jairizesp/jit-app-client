import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from 'src/app/interface/car/car.interface';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  car$: Observable<Car> = this.carService.findCarById(this.id);

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {}
}
