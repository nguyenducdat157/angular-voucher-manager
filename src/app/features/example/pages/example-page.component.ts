import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { API_BASE_URL } from 'src/app/core/tokens/app.tokens';
import { emailValidator } from 'src/app/shared/validators/email.validator';
import { ExampleService } from '../example.service';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss']
})
export class ExamplePageComponent {
  emailForm = this.fb.group({
    email: ['', [emailValidator()]]
  });

  constructor(
    private exampleService: ExampleService,
    @Inject(API_BASE_URL) private apiUrl: string,
    private fb: FormBuilder,
  ) {}

  logExample() {
    this.exampleService.logExample();
  }
}
