import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A test Recipe',
      'This is a dest',
      'https://cdn.galleries.smcloud.net/t/galleries/gf-KKL8-gvG7-jTss_przepis-na-pizzerinki-puszyste-i-pyszne-mini-pizze-664x442-nocrop.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),

    new Recipe('A test Recipe',
      'This is a dest',
      'https://cdn.galleries.smcloud.net/t/galleries/gf-KKL8-gvG7-jTss_przepis-na-pizzerinki-puszyste-i-pyszne-mini-pizze-664x442-nocrop.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Fries', 3)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }


  addIngredientsToShoppingList(ingredients: Ingredient[]) {
     this.slService.addIngredients(ingredients)
  }
}
