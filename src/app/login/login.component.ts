import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(15), Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$')]],
      password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(10), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).+$')]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(users => {
        if (users.length > 0) {
          this.authService.setSession(username);
          this.router.navigate(['/dashboard']);
        }});
    }
  }

}

@Component({
  selector: 'login-failed-dialog',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Error</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="close()"></button>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="close()">OK</button>
    </div>
  `
})
export class LoginFailedDialog {
  message: string = '';

  constructor(private modalRef: NgbModal) {}

  close(): void {
    this.modalRef.dismissAll();
  }
}
