import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  isEditModalVisible = false;

  constructor() {}

  toggleEditModal() {
    this.isEditModalVisible = !this.isEditModalVisible;
  }
}
