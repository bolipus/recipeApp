import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'RecipeApp';

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyCq8WkTPTGgAu9ZIAvG9wyg-_vsrmhyv1k",
      authDomain: "test-http-cefa0.firebaseapp.com",
      databaseURL: "https://test-http-cefa0.firebaseio.com",
      projectId: "test-http-cefa0",
      storageBucket: "test-http-cefa0.appspot.com",
      messagingSenderId: "236378443335",
      appId: "1:236378443335:web:56a677a8baaf9e6f8d6b62"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

}




