import { Component, OnInit } from '@angular/core';
import { DrinksDataService } from 'src/app/services/drinks-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email !: string;
  password !: string;
  errorMessage !: string;
  loginForm !: FormGroup;

  constructor(private service: DrinksDataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email
      let password = this.loginForm.value.password
      if (email && password) {
        this.service.login(email, password)
          .catch((error) => {
            this.errorMessage = error.message;
          });
      } else {
        this.errorMessage = 'Please enter email and password.';
      }
    }
  }

}
