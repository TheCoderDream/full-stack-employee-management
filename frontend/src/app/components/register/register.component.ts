import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})export class RegisterComponent {

  constructor(private auth: AuthenticationService, private router: Router) {}

  credentials: TokenPayload = {
    _id: '',
    userName: '',
    fullName: '',
    email: '',
    password: ''
  };

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required),
    emailid: new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
  ]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required
  ]),
    repassword: new FormControl('', [
      Validators.minLength(8),
      Validators.required
  ])
  });

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value);

      // Go to TODO page
      this.auth.register(this.credentials).subscribe(
        () => {
          this.router.navigate(['/employee-list']);        },
        err => {
          console.error(err);
        }
      );
    }
  }

  onClickHaveAccount() {
    console.log('Back to login clicked');
    this.router.navigate(['/login']);
  }

}
