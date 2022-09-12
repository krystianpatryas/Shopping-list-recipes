import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is a dest', 'https://cdn.galleries.smcloud.net/t/galleries/gf-KKL8-gvG7-jTss_przepis-na-pizzerinki-puszyste-i-pyszne-mini-pizze-664x442-nocrop.jpg')
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
