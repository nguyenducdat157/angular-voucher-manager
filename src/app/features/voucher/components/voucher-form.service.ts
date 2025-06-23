import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Voucher } from 'src/app/features/voucher/voucher.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class VoucherFormService {
  constructor(private fb: FormBuilder) {}

  initializeForm(): FormGroup {
    return this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(200)],
      expiryDate: ['', [Validators.required, this.futureDateValidator()]],
    });
  }

  populateFormWithVoucher(form: FormGroup, voucher: Voucher): void {
    form.patchValue({
      code: voucher.code,
      description: voucher.description || '',
      expiryDate: this.parseExpiryDate(voucher.expiryDate),
    }, { emitEvent: false });
  }

  clearFormData(form: FormGroup, formDirective?: { resetForm: () => void }): void {
    form.reset();
    if (formDirective) {
      formDirective.resetForm();
    }
  }

  createVoucherFromForm(form: FormGroup, voucherToEdit: Voucher | null): Voucher {
    const formValue = form.value;
    return {
      id: voucherToEdit?.id || uuidv4(),
      code: formValue.code.trim(),
      description: formValue.description?.trim() || '',
      expiryDate: formValue.expiryDate,
      status: voucherToEdit?.status || 'Available',
    };
  }

  futureDateValidator() {
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

  parseExpiryDate(expiryDate: string | Date): Date {
    if (expiryDate instanceof Date) {
      return expiryDate;
    }
    return new Date(expiryDate);
  }
}
