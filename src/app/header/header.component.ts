import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() selected = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  selectRecipe(isRecipe: boolean){
    console.log("IsRecipe:" +isRecipe);
    this.selected.emit(isRecipe);
    console.log("IsRecipe:" +isRecipe);
  }

  

}
