import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private storage: StorageService, private router: Router) {
    this.form = this.formBuilder.group({
      username: ['user@aemenersol.com', [Validators.required, Validators.email]],
      password: ['Test@123', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    const token = await this.api.login(this.form.value);
    await this.storage.set(this.storage.AUTH, { token });
    this.router.navigate(['/dashboard']);
  }

}
