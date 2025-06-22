import { Component, EventEmitter, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Voucher } from 'src/app/features/voucher/voucher.model';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(private readonly fb: FormBuilder) {
    this.form = this.initializeForm();
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
        const voucher = this.createVoucherFromForm();
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

  private
  initializeForm(): FormGroup {
    return this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(200)],
      expiryDate: ['', [Validators.required, this.futureDateValidator()]],
    });
  }

  private handleVoucherChange(): void {
    if (this.voucherToEdit) {
      this.populateFormWithVoucher();
    } else {
      this.clearFormData();
    }
  }

  private populateFormWithVoucher(): void {
    if (!this.voucherToEdit) return;

    try {
      this.form.patchValue({
        code: this.voucherToEdit.code,
        description: this.voucherToEdit.description || '',
        expiryDate: this.parseExpiryDate(this.voucherToEdit.expiryDate),
      }, { emitEvent: false });
    } catch (error) {
      console.error('Error populating form with voucher:', error);
      this.clearFormData();
    }
  }

  private clearFormData(): void {
    this.form.reset();
    if (this.formDirective) {
      this.formDirective.resetForm();
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

  private createVoucherFromForm(): Voucher {
    const formValue = this.form.value;

    return {
      id: this.voucherToEdit?.id || uuidv4(),
      code: formValue.code.trim(),
      description: formValue.description?.trim() || '',
      expiryDate: formValue.expiryDate,
      status: this.voucherToEdit?.status || 'Available',
    };
  }

  private parseExpiryDate(expiryDate: string | Date): Date {
    if (expiryDate instanceof Date) {
      return expiryDate;
    }
    return new Date(expiryDate);
  }

  private futureDateValidator() {
    return (control: any) => {
      if (!control.value) return null;

      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        return { pastDate: true };
      }
      return null;
    };
  }
}
