import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private toaster = inject(ToastrService);
  private router = inject(Router);
  step = 1;

  forgetPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  verifyForm = this.formBuilder.group({
    resetCode: ['', [Validators.required, Validators.minLength(3)]],
  });
  resetPasswordForm = this.formBuilder.group({
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9@]{5,}/)],
    ],
    email: ['', [Validators.required, Validators.email]],
  });

  handleSubmitForgetPassword() {
    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.markAllAsTouched();
      return;
    }

    this.authService
      .forgetPassword(this.forgetPasswordForm.value.email!)
      .subscribe({
        next: (res) => {
          console.log(res);

          if (res.statusMsg == 'success') {
            this.step = 2;
            this.resetPasswordForm.patchValue({
              email: this.forgetPasswordForm.value.email,
            });
          }
        },
        error: (err) => {
          console.log(err);
          this.toaster.error(err.error.message);
        },
      });
  }
  handleSubmitVerifyCode() {
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }
    this.authService.verifyCode(this.verifyForm.value.resetCode!).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
        this.toaster.error(err.error.message);
      },
    });
  }
  handleSubmitResetPass() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }
    this.authService
      .resetPassword(
        this.resetPasswordForm.value.email!,
        this.resetPasswordForm.value.newPassword!
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.token) {
            this.toaster.success('Password reset successful');
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err);
          this.toaster.error(err.error.message);
        },
      });
  }
}
