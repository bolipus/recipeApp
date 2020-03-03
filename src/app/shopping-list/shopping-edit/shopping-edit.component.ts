import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list-actions';
import * as fromShoppingList from '../store/shopping-list-reducers';
import { State } from '../store/shopping-list-reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;

  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.store.select('shoppingList').subscribe(
      (data: State) => {
        if (data.editedIngredientIndex > -1 ){
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode === true) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient: newIngredient}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onReset() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onReset();
  }


}
