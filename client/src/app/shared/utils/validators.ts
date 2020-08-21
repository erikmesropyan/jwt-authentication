import {AbstractControl, ValidationErrors} from '@angular/forms';

export class PasswordMatcher {

  public static passwordsMatch(control: AbstractControl): ValidationErrors {
    if (!control.get('password') || !control.get('passwordConfirm')) {
      return null;
    }
    return control.get('password').value !== control.get('passwordConfirm').value ? {passwordMismatch: true} : null;
  }
}
