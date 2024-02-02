import { Component, ElementRef, Input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('slideRightToLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeOut', [
      transition(':leave', [animate('2s ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ToastComponent {
  @Input() toastMessage!: string;
  @Input() status!: string;

  isVisible: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = false;
    }, 2000);
  }
}
