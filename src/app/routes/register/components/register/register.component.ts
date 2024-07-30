import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),

        email: new FormControl('', [Validators.required, Validators.email]),

        userName: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\S*$/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: confirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  handleRegister() {
    console.log('Done!');
  }
}

function confirmPasswordValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(passwordKey);
    const confirmPasswordControl = formGroup.get(confirmPasswordKey);

    if (!passwordControl || !confirmPasswordControl) {
      return null; 
    }

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['passwordMismatch']
    ) {
      return null; 
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}
