import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServices } from '../_services/ApiServices';


@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    returnUrl: string;
    public message: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private apiServices: ApiServices,
    ) {
        // redirect to home if already logged in
        this.apiServices.currentUser
            .subscribe(user => {
                if (user && user.userName != null) {
                this.router.navigate(['/']);
                }
            });
        this.intiForm();
    }

    intiForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        try {
            this.apiServices
                .login(this.f.username.value, this.f.password.value)
                .subscribe(response => {
                    this.loading = false;
                    if (response.user && response.user.uid) {
                        this.router.navigate(['/']);
                    }
                    else {
                        this.message = 'Invalid username or password.';
                    }
                })
        }
        catch (e) {
            this.message = 'Invalid username or password.';
        }
    }

    
}