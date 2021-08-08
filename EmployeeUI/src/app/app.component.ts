import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from './_services/ApiServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee UI';

  welcomeText:string;

  constructor( private router: Router,private apiServices: ApiServices){
    this.apiServices.currentUser
    .subscribe(user => {
        if (user && user.userName != null) {
          this.welcomeText = "Welcome "+user.displayName
        }
    });
  }

  logout(){
    this.apiServices.logout()
    this.welcomeText = "Login";

    this.router.navigate(['../login']);
  }
  
}
