import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuGridToggleComponent } from './components/menu-grid-toggle/menu-grid-toggle.component';



@NgModule({
  declarations: [
    MenuGridToggleComponent
  ],
  exports: [
    MenuGridToggleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
