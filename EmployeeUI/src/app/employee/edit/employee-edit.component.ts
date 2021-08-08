import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/_models';
import { ApiServices } from '../../_services/ApiServices';



@Component({
  selector: 'employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: FormGroup;
  submitted: boolean = false;
  loading:boolean=false;
  message:string;

  constructor(
    private apiServices: ApiServices,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
     ) { }

  employee:Employee;
  isLoaded:Boolean=false;
  id:number;

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.isLoaded = false;
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.getEmployee(this.id);
    });


    
  }

  populateForms(item:Employee){
    this.editEmployeeForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.maxLength(128)]],
      salary: ['', [Validators.required]],
      managerName: ['', [Validators.required,Validators.maxLength(128)]],
    });

    this.f['name'].setValue(item.name);
    this.f['salary'].setValue(item.salary);
    this.f['managerName'].setValue(item.managerName);

    this.isLoaded = true;
  }

  
  getEmployee(id:number){
    this.apiServices.getEmployee(id)
    .subscribe(response => { 
      this.employee = response;
      

      this.populateForms(this.employee);
    });
  }

  get f() { return this.editEmployeeForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editEmployeeForm.invalid) {
      return;
    }
    this.loading = true;
    let item = this.editEmployeeForm.value;
    item.id = this.id;
    this.apiServices.editEmployee(item)
      .subscribe(data => {
        this.loading = false;
        this.message = 'Employee Edited successfully!';
      },
      (error) => {        
          this.loading = false;
          this.message = 'Error Editting Employee.';
        });    
    this.loading = true;
  }
}
