import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <header class="main-header">
      <h1>Voucher Manager</h1>
      <!-- Thêm navigation hoặc logo ở đây -->
    </header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <footer class="main-footer">
      <span>© {{year}} Voucher Manager. All rights reserved.</span>
    </footer>
  `,
  styles: [`
    .main-header {
      background: #1976d2;
      color: #fff;
      padding: 1rem;
      text-align: center;
    }
    .main-content {
      min-height: 70vh;
      padding: 2rem 1rem;
    }
    .main-footer {
      background: #f5f5f5;
      color: #333;
      text-align: center;
      padding: 1rem;
      font-size: 0.95rem;
    }
  `]
})
export class MainLayoutComponent {
  year = new Date().getFullYear();
}
