import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User,Employee } from '../_models';

@Injectable({ providedIn: 'root' })
export class ApiServices {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    private employeeSubject: Subject<Employee[]> = new Subject<Employee[]>();;
    public employees: Observable<Employee[]>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('employees')));
        this.employees = this.employeeSubject.asObservable();
    }

    login(username: string, password: string) {
        let formBody = {
                "password": password,
                "userNAme": username
            };

        return this.http.post<any>(`${environment.ApplicationServer}/api/Authentication/login`,
            formBody)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user.accessToken = user.access_token;
                    user.expires = user.expires;
                    user.issued = user.issued;
                    user.refreshToken = user.refresh_token;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');

                this.currentUserSubject = new BehaviorSubject<User>(null);
                this.currentUser = this.currentUserSubject.asObservable();
                
                this.currentUserSubject.next(null);
                return true;
    }

    getEmployees(){
        return this.http.get<any>(`${environment.ApplicationServer}/api/employee/`)
        .pipe(map(emp => {
            localStorage.setItem('employees', JSON.stringify(emp));
            this.employees = this.employeeSubject.asObservable();
            this.employeeSubject.next(emp);
            return emp;
        }));
    }

    getEmployee(id:number){
        return this.http.get<any>(`${environment.ApplicationServer}/api/employee/${id}`)
        .pipe(map(emp => {
            return emp;
        }));
    }

    addEmployee(employee:Employee){
        return this.http.post<any>(`${environment.ApplicationServer}/api/employee/`, employee)
            .pipe(map(response => {
                return response;
            }));
    }

    editEmployee(employee:Employee){
        return this.http.put<any>(`${environment.ApplicationServer}/api/employee/${employee.id}`, employee)
            .pipe(map(response => {
                //console.log(response);

                return response;
            }));
    }
}

