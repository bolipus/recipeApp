import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient';
import * as ShoppingListActions from './store/shopping-list-actions';
import * as fromShoppingList from './store/shopping-list-reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  // tslint:disable-next-line: quotemark
  templateUrl: "./shopping-list.component.html",
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }


  onEditItem(indexEdit: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit({index: indexEdit}));
  }
}
