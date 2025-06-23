import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
    // Thêm các module dùng chung ở đây
  ],
  declarations: [
    // Thêm các component, directive, pipe dùng chung ở đây
  ],
  exports: [
    CommonModule
    // Export các thành phần dùng lại nhiều nơi
  ]
})
export class SharedModule {}
