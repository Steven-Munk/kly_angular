import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  scArray;

  constructor() {
    const scTextArray = localStorage.getItem('Shopping-Cart');
    if (scTextArray !== null) {
      this.scArray = JSON.parse(scTextArray);
      console.log(this.scArray);
      
    } else {
      console.log('Shopping Cart empty');
    }
  }



















}
