import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/_models';
import { ApiServices } from '../../_services/ApiServices';



@Component({
  selector: 'employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  submitted: boolean = false;
  loading:boolean=false;
  message:string;

  constructor(
    private apiServices: ApiServices,
    private formBuilder: FormBuilder,
     ) { }

  public employees:Employee[];
  public isLoaded:Boolean;

  ngOnInit() {
    this.addEmployeeForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.maxLength(128)]],
      salary: ['', [Validators.required]],
      managerName: ['', [Validators.required,Validators.maxLength(128)]],
    });
  }

  get f() { return this.addEmployeeForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addEmployeeForm.invalid) {
      return;
    }
    this.loading = true;
    let item = this.addEmployeeForm.value;
    this.apiServices.addEmployee(item)
      .subscribe(data => {
        this.loading = false;
        this.message = 'Employee Added successfully!';
      },
      (error) => {        
          this.loading = false;
          this.message = 'Error Adding Employee.';
        });    
    this.loading = true;
  }
}
