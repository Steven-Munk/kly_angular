import { Component } from '@angular/core';
import { FoodsPageComponent } from '../foods-page/foods-page.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  shoppingInfo: FoodsPageComponent;
  shoppingCart = [];

  constructor() {

    this.shoppingInfo = new FoodsPageComponent;

    this.shoppingCart = this.shoppingInfo.cart;

    console.log(this.shoppingCart);
    
  }

}
