import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.scss']
})

export class FoodsPageComponent extends AppComponent {

  userSearchesFood: boolean = false;
  foodCardOpen = false;
  foodCardInfo = [
    {
      'food': '',
      'dsc': '',
      'amount': 1,
      'price': 0,
      'total': 0,
      'img': '',
      'id': ''
    }
  ];


  constructor() {
    super();   
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
    this.foodCardInfo[0].id = menu.id;
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


  addItemToCart() {
    const scTextArray = localStorage.getItem('Shopping-Cart');
    if (scTextArray !== null) {
      this.pushItemInto(scTextArray)
    } else {
      this.setShoppingCartStorage()
    }
    this.closeFoodCard();
  }


  pushItemInto(scTextArray) {
    const scArray = JSON.parse(scTextArray);
    this.checkIfItemAlreadyExists(scArray);
    scArray.push(this.foodCardInfo[0]);
    const updatedArray = JSON.stringify(scArray);
    localStorage.setItem('Shopping-Cart', updatedArray);
  }


  checkIfItemAlreadyExists(scArray) {
    scArray.forEach(scItem => {
      if (scItem.id == this.foodCardInfo[0].id) {
        this.foodCardInfo[0].amount = scItem.amount + this.foodCardInfo[0].amount;
        this.foodCardInfo[0].total = scItem.total + this.foodCardInfo[0].total;
        let indexOfItem = scArray.indexOf(scItem);
        scArray.splice(indexOfItem, 1);
      }
    });
  }


  setShoppingCartStorage() {
    localStorage.setItem('Shopping-Cart', JSON.stringify(this.foodCardInfo));
  }


  closeFoodCard() {
    this.foodCardOpen = false;
    this.foodCardInfo[0].food = '';
    this.foodCardInfo[0].dsc = '';
    this.foodCardInfo[0].amount = 1;
    this.foodCardInfo[0].price = 0;
    this.foodCardInfo[0].total = 0;
    this.foodCardInfo[0].img = '';
    this.foodCardInfo[0].id = '';
  }
}