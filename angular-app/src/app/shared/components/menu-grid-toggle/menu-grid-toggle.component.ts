import { Component } from '@angular/core';
import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-menu-grid-toggle',
  templateUrl: './menu-grid-toggle.component.html',
  styleUrls: ['./menu-grid-toggle.component.scss'],
  animations: [
    trigger('.menuToggle', [
      // Closed state style (scale down and hidden)
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.5)'
      })),
      // Open state style (full size and visible)
      state('open', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('closed => open', [
        query('.menu-button', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ]),
      transition('open => closed', [
        query('.menu-button', [
          stagger(100, [
            animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
          ])
        ])
      ])
    ])
  ]
})
export class MenuGridToggleComponent {
  isOpen = false;
  dots = new Array(9); // Represents 9 dots
  menuItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9'];

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
