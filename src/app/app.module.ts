import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { voucherReducer } from 'src/app/store/voucher/voucher.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VoucherEffects } from 'src/app/store/voucher/voucher.effects';
import { VoucherModule } from 'src/app/features/voucher/voucher.module';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { API_BASE_URL } from './core/tokens/app.tokens';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot({ vouchers: voucherReducer }),
    EffectsModule.forRoot([VoucherEffects]),
    VoucherModule
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
