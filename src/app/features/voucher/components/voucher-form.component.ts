import { Component, EventEmitter, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Voucher } from 'src/app/features/voucher/voucher.model';
import { VoucherFormService } from './voucher-form.service';

@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
})
export class VoucherFormComponent implements OnDestroy {
  @Output() save = new EventEmitter<Voucher>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild('formDirective') private formDirective!: NgForm;

  public form: FormGroup;
  public isSubmitting = false;

  private _voucherToEdit: Voucher | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(private formService: VoucherFormService) {
    this.form = this.formService.initializeForm();
  }

  @Input()
  get voucherToEdit(): Voucher | null {
    return this._voucherToEdit;
  }

  set voucherToEdit(value: Voucher | null) {
    this._voucherToEdit = value;
    this.handleVoucherChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    if (this.isFormValid()) {
      this.isSubmitting = true;
      try {
        const voucher = this.formService.createVoucherFromForm(this.form, this.voucherToEdit);
        this.save.emit(voucher);
        this.clearForm();
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  public onReset(): void {
    this.clearForm();
    this.cancel.emit();
  }

  // Public API methods for parent component
  public loadVoucherForEdit(voucher: Voucher): void {
    this.voucherToEdit = voucher;
  }

  public clearForm(): void {
    this.voucherToEdit = null;
  }

  private handleVoucherChange(): void {
    if (this.voucherToEdit) {
      this.formService.populateFormWithVoucher(this.form, this.voucherToEdit);
    } else {
      this.formService.clearFormData(this.form, this.formDirective);
    }
  }

  private isFormValid(): boolean {
    if (!this.form.valid) {
      this.markFormAsTouched();
      return false;
    }
    return true;
  }

  private markFormAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }
}
