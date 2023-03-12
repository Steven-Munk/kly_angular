import { Component } from '@angular/core';

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.scss']
})
export class FoodsPageComponent {

  foodWeServe = ['best-foods', 'pizzas', 'burgers', 'bbqs', 'drinks'];
  menuJSON: any = [];
  upperCaseCategories = [];
  apiLoaded: boolean = false;
  userSearchesFood: boolean = false;


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
            menu['display'] = true;
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


  searchFood(search: string) {
    if (search == '') {
      this.userSearchesFood = false;
      this.displayAllMenus();
    } else {
      this.userSearchesFood = true;
      this.displaySearchedMenus(search);
    }
  }


  displayAllMenus() {
    this.menuJSON.forEach(categorie => {
      categorie.menus.forEach(menu => {
        menu.display = true;
      });
    });
  }


  displaySearchedMenus(search: string) {
    this.menuJSON.forEach(categorie => {
      categorie.menus.forEach(menu => {
        let menuName = menu.name.toLowerCase();
        let searchedName = search.toLowerCase();
        if (menuName.includes(searchedName)) {
          menu.display = true;
        } else {
          menu.display = false;
        }
      });
    });
  }






























  foodCardOpen = false;
  foodCardInfo = [
    {
      'food': '',
      'dsc': '',
      'amount': 1,
      'price': 0,
      'total': 0,
      'img': ''
    }
  ];


  toggleFoodCard(id) {
    this.foodCardOpen = true;
    this.menuJSON.forEach(categorie => {
      categorie.menus.forEach(menu => {
        if (menu.id.includes(id)) {
          this.ensertFoodToCard(menu);
        }
      });
    });
  }


  ensertFoodToCard(menu) {
    this.foodCardInfo[0].food = menu.name;
    this.foodCardInfo[0].dsc = menu.dsc;
    this.foodCardInfo[0].price = menu.price;
    this.foodCardInfo[0].total = menu.price;
    this.foodCardInfo[0].img = menu.img;
  }


  changeAmountAndTotal(operation: string) {
    this.changeAmount(operation)
    this.changeTotal();
  }


  changeAmount(operation) {
    if (operation == '+' && this.foodCardInfo[0].amount < 100) {
      this.foodCardInfo[0].amount++;
    } else if (this.foodCardInfo[0].amount > 1) {
      this.foodCardInfo[0].amount--;
    }
  }


  changeTotal() {
    let price = this.foodCardInfo[0].price;
    let newAmount = this.foodCardInfo[0].amount;
    this.foodCardInfo[0].total = Math.floor(price * newAmount);
  }


  addToCart() {
    console.log('take info from foodCartInfo and add to sc');
  }


  closeFoodCard() {
    this.foodCardOpen = false;
    this.foodCardInfo[0].food = '';
    this.foodCardInfo[0].dsc = '';
    this.foodCardInfo[0].amount = 1;
    this.foodCardInfo[0].price = 0;
    this.foodCardInfo[0].total = 0;
    this.foodCardInfo[0].img = '';
  }
}