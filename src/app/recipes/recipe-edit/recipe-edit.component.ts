import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeIngidients: FormArray = new FormArray([]);

  constructor(private route: ActivatedRoute, private recipeService: RecipeService ) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +(params.id);
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm(){

    let recipeName = '';
    let imagePath = '';
    let description = '';


    if (this.editMode){
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingridients){
        for(const ingridient of recipe.ingridients){
          this.recipeIngidients.push(new FormGroup({
            name: new FormControl(ingridient.name),
            amount: new FormControl(ingridient.amount)
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(imagePath),
      description: new FormControl(description),
      ingridients: this.recipeIngidients
    });
  }

  onAddIngridient(){
    (this.recipeForm.get('ingridients') as FormArray).push(new FormGroup({
      name: new FormControl(),
      amount: new FormControl()
    }));
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

}
