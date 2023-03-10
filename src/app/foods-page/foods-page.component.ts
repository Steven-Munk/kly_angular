import { Component } from '@angular/core';

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.scss']
})
export class FoodsPageComponent {

  categorieList10: any = [];

  constructor() {
    this.x();
  }

  async x() {
    await fetch('https://free-food-menus-api-production.up.railway.app/pizzas')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        for (let i = 0; i < 10; i++) {
          const menu = data[i];
          this.categorieList10.push(menu);          
        }
        console.log('Eine Liste an ausgewähltem Essen (10x):', this.categorieList10);
      })
      .catch(error => {
        console.log('There was a problem with the fetch operation:', error);
      });
  }
}



  // SOME OTHER FOODS
  //
  // /bbqs
  // /best-foods
  // /breads
  // /burgers
  // /chocolates
  // /desserts
  // /drinks
  // /fried-chicken
  // /ice-cream
  // /pizzas
  // /porks
  // /sandwiches
  // /sausages
  // /steaks

