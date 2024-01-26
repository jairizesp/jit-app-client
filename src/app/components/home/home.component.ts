import { Component, OnInit } from '@angular/core';
import { every } from 'rxjs';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isModalVisible = false;
  isFilterHidden = false;

  carMake: { make: string }[] = [];
  carModel: { model: string }[] = [];
  carYear: { year: number }[] = [];

  isRequestComplete = false;

  constructor(private carService: CarService) {}

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
    console.log(this.isModalVisible);
  }

  closeModal(event: boolean) {
    this.isModalVisible = event;
  }

  toggleFilter() {
    this.isFilterHidden = !this.isFilterHidden;

    this.carService.getCarMake().subscribe((make) => {
      this.carMake = make;
    });

    this.carService.getCarModel().subscribe(
      (model) => {
        this.carModel = model;
      },
      () => {},
      () => {
        this.isRequestComplete = true;
      }
    );
  }

  // getCars(){
  //   this.carService.getCars()
  // }

  ngOnInit(): void {}
}
