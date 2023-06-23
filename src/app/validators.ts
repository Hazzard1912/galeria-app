import { ValidatorFn, AbstractControl } from '@angular/forms';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isValid = emailRegex.test(control.value);
    return isValid ? null : { invalidEmail: true };
  };
}
