import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordMatcher } from '../shared/utils/validators';
import { UserService } from '../shared/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  public message = '';
  public status = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
      }, { validator: PasswordMatcher.passwordsMatch })
    });
  }

  // convenience getter for easy access to form fields
  get form(): { [p: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get passwords(): FormGroup {
    return (this.form.passwords as FormGroup);
  }

  onSubmit(): void {
    this.submitted = true;
    this.status = '';
    this.message = '';
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        message => {
          this.loading = false;
          setTimeout(async () => {
            this.message = message;
            this.status = 'success';
            await this.router.navigate(['/login']);
          }, 2000);
        },
        error => {
          this.status = 'fail';
          this.message = error.error.message || error.message;
          this.loading = false;
        });
  }
}
