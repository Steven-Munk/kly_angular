import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kly_angular';

  foodWeServe = ['best-foods', 'pizzas', 'burgers', 'bbqs', 'drinks'];
  menuJSON: any = [];
  upperCaseCategories = [];
  apiLoaded: boolean = false;


  constructor() {
    this.fillMenuJSON();
    this.upperCaseCategorieNames();
    this.loadApiIntoJSON();
  }


  fillMenuJSON() {
    this.foodWeServe.forEach(foodCategorie => {
      this.menuJSON.push({
        'food': foodCategorie,
        'menus': [],
      })
    })
  }


  upperCaseCategorieNames() {
    this.menuJSON.forEach(menu => {
      this.upperCaseCategories.push(menu.food.charAt(0).toUpperCase() + menu.food.slice(1));
    });
  }


  async loadApiIntoJSON() {
    for (let i = 0; i < this.menuJSON.length; i++) {
      const menuCategorie = this.menuJSON[i].food;
      this.fetchApi(menuCategorie, i);
    }
    this.apiLoaded = true;
  }


  async fetchApi(menuCategorie, i) {
    await fetch(`https://free-food-menus-api-production.up.railway.app/${menuCategorie}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        this.pushIntoJSON(data, i);
      })
      .catch(error => {
        console.log('There was a problem with the fetch operation:', error);
      });
  }


  pushIntoJSON(data, i) {
    for (let d = 0; d < 5; d++) {
      const menu = data[d];
      menu['display'] = true;
      this.menuJSON[i].menus.push(menu);
    }
  }
}