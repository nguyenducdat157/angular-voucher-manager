import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VoucherPageComponent } from "src/app/features/voucher/pages/voucher-page.component";
import { VoucherFormComponent } from "src/app/features/voucher/components/voucher-form.component";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// src/app/features/voucher/voucher.module.ts
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatButtonToggleModule,
  ],
  declarations: [
    VoucherPageComponent,
    VoucherFormComponent
  ]
})
export class VoucherModule {}
