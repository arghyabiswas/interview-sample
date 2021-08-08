import { Component } from '@angular/core';
import { ApiServices } from '../_services/ApiServices';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  employeeCount:number=0;

  constructor(private apiServices: ApiServices){
    this.getEmployeeCount();
  }

getEmployeeCount(){
  debugger;
  this.apiServices.employees
  .subscribe(response => { 
    this.employeeCount = response.length;
  });
}
}

