import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipeApp';

  recipeSelected: boolean = true;

  onSelectView(selected: boolean){
    console.log(selected);
    this.recipeSelected = selected;
    console.log("onSelectView: " + this.recipeSelected);
  }



}
