import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './employee/add/employee-add.component';
import { EditEmployeeComponent } from './employee/edit/employee-edit.component';
import { EmployeeListComponent } from './employee/list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_gourds/auth.gourd';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent, pathMatch: 'full',canActivate: [AuthGuard] },
  { path: 'employee/:id', component: EditEmployeeComponent, pathMatch: 'full',canActivate: [AuthGuard] },
  { path: 'add-employee', component: AddEmployeeComponent, pathMatch: 'full',canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
