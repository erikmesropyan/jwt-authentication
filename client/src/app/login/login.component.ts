import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {first} from 'rxjs/operators';
import { Role } from '../shared/models/User';


@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      remember: [false]
    });

  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.login(this.loginForm.get('email').value, this.loginForm.get('password').value, this.loginForm.get('remember').value)
      .pipe(first())
      .subscribe( async (user) => {
        this.loading = false;
        if (user.role === Role.ADMIN) {
          await this.router.navigateByUrl('/admin');
        } else if (user.role === Role.USER) {
          await this.router.navigateByUrl('/user');
        }
      }, err => {
        this.loading = false;
        console.log(err);
        this.error = err.error.message;
      });
  }
}
