import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.reducers';
import { LogOutAction } from '../../auth/store/auth.actions';
import { AuthState } from '../../auth/store/auth.reducers';
import { DataStorageService } from '../../services/data-storage.service';
import { RecipeFeatureState } from '../../recipes/store/recipe.reducers';
import { FetchRecipes } from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<AppState>,
    private recipeStore: Store<RecipeFeatureState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.recipeStore.dispatch(new FetchRecipes());
  }

  onLogout() {
    console.log('OnLogout');
    this.store.dispatch(new LogOutAction());
  }
}
