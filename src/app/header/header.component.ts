import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

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

  onLogout() {
    this.authService.logout();
  }

}
