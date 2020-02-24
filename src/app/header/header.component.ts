import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData(){
    console.log('OnSaveData');
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    console.log('FetchData');
    this.dataStorageService.fetchRecipes();
  }

}
