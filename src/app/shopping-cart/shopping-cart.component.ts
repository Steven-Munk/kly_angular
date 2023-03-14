import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  scArray;
  scTotal: number = 0;
  checkout: boolean = true;


  constructor() {
    this.renderShoppingCart();
  }


  updateShoppingCart() {
    this.saveShoppingCart();
    this.renderShoppingCart();
    this.getScTotal();
  }


  saveShoppingCart() {
    const updatedArray = JSON.stringify(this.scArray);
    localStorage.setItem('Shopping-Cart', updatedArray);
  }


  renderShoppingCart() {
    const scTextArray = localStorage.getItem('Shopping-Cart');
    if (scTextArray !== null) {
      this.scArray = JSON.parse(scTextArray);
    } else {
      console.log('Shopping Cart empty');
    }
  }

  getScTotal() {
    this.scTotal = 0;
    this.scArray.forEach(item => {
      this.scTotal = this.scTotal + item.total;
    });
  }


  decreaseAmountOf(index) {
    if (this.scArray[index].amount > 1) {
      this.scArray[index].amount--;
      this.scArray[index].total = this.scArray[index].total - this.scArray[index].price;
    } else {
      this.scArray.splice(index, 1);
    }
    this.updateShoppingCart();
  }


  addAmountOf(index) {
    this.scArray[index].amount++;
    this.scArray[index].total = this.scArray[index].total + this.scArray[index].price;
    this.updateShoppingCart();
  }
}