import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './shared/ui/modal/modal.component';
import { CarsComponent } from './components/cars/cars.component';
import { FiltersComponent } from './components/filters/filters.component';
import { SpinnerComponent } from './shared/ui/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortComponent } from './components/sort/sort.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, HomeComponent, HeaderComponent, ModalComponent, CarsComponent, FiltersComponent, SpinnerComponent, SortComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
