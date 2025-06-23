import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoucherPageComponent } from 'src/app/features/voucher/pages/voucher-page.component';

const routes: Routes = [
  {
    path: 'example',
    loadChildren: () => import('./features/example/example.module').then(m => m.ExampleModule)
  },
  {
    path: '',
    component: VoucherPageComponent
  },
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
