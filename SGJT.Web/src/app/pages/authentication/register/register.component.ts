import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      role: ['Gestor'],
      password: [''],
      confirmPassword: ['']
    });
  }

  submit() {
    this.authenticationService.register(this.form.value).subscribe(success => {
      this.authenticationService.login(this.form.value).subscribe(success => {
        this.router.navigateByUrl("pages");
      });
    }, error => {
      error.error.forEach(a => {
        let formControl = this.form.get(a.propertyName);
        formControl.setErrors(a.errors);
      });
    });
  }
}
