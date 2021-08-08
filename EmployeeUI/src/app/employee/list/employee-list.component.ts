import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../../_services/ApiServices';
import { Employee } from '../../_models/User';



@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private apiServices: ApiServices,
     ) { }

  public employees:Employee[];
  public isLoaded:Boolean;

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(){
    this.apiServices.getEmployees()
    .subscribe(response => { 
      this.employees = response;
      this.isLoaded = true;
    });
  }
}
