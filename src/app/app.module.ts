import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { voucherReducer } from 'src/app/store/voucher/voucher.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VoucherEffects } from 'src/app/store/voucher/voucher.effects';
import { VoucherModule } from 'src/app/features/voucher/voucher.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ vouchers: voucherReducer }),
    EffectsModule.forRoot([VoucherEffects]),
    VoucherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
