import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule
  ],
  providers: [ShoppingListService, RecipeService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
