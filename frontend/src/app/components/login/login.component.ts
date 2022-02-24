import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  credentials: TokenPayload = {
    _id: '',
    fullName: '',
    userName: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]),
    password: new FormControl('', Validators.required)
  });

  submit() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigate(['/employee-list']);
      },
      err => {
        console.error(err);
      }
    );
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  onClickRegister() {
    this.router.navigate(['/register']);
  }

}
