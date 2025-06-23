import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamplePageComponent } from './pages/example-page.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';
import { OnlyNumberDirective } from 'src/app/shared/directives/only-number.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExampleRoutingModule } from './example-routing.module';

@NgModule({
  declarations: [
    ExamplePageComponent,
    ButtonComponent,
    CapitalizePipe,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ExampleRoutingModule
  ]
})
export class ExampleModule {}
