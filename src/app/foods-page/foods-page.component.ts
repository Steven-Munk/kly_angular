import { Component } from '@angular/core';

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.scss']
})
export class FoodsPageComponent {

  menuJSON: any = [
    
    {
      'food': 'best-foods',
      'menus': []
    },
    {
      'food': 'pizzas',
      'menus': []
    },
    {
      'food': 'burgers',
      'menus': []
    },
    {
      'food': 'bbqs',
      'menus': []
    },
    {
      'food': 'drinks',
      'menus': []
    }
  ];

  upperCaseCategories = [];
  apiLoaded: boolean = false;



  constructor() {
    this.upperCaseCategorieNames();
    this.y();
  }

  upperCaseCategorieNames() {
    this.menuJSON.forEach(menu => {
      this.upperCaseCategories.push(menu.food.charAt(0).toUpperCase() + menu.food.slice(1));
    });    
  }

  async y() {
    for (let i = 0; i < this.menuJSON.length; i++) {
      const menuCategorie = this.menuJSON[i].food;

      await fetch(`https://free-food-menus-api-production.up.railway.app/${menuCategorie}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })

        .then(data => {
          for (let d = 0; d < 5; d++) {
            const menu = data[d];
            this.menuJSON[i].menus.push(menu);
          }
        })

        .catch(error => {
          console.log('There was a problem with the fetch operation:', error);
        });
    }
    console.log(this.menuJSON);
    this.apiLoaded = true;

  }










}