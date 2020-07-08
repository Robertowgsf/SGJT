import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      password: ['']
    });
  }

  submit() {
    this.authenticationService.login(this.form.value).subscribe(success => {
      console.log(success);
      this.router.navigateByUrl("pages");
      // Redirecionar
    }, error => {
      error.error.forEach(a => {
        let formControl = this.form.get(a.propertyName);
        formControl.setErrors(a.errors);
      });
    });
  }

}
