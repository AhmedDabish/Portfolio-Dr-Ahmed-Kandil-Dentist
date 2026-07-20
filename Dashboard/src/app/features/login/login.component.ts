import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { ApiService } from '../../core/services/api.service';
import { ToastService } from '../../core/services/toast.service';
import { DashboardDataService } from '../../core/services/dashboard-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">

      <div class="bg-animation">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>

      <div class="login-wrapper">
        <div class="login-card">
            <div class="login-header">
            <div class="logo-icon">
    <i class="fa-solid fa-tooth tooth-3d"></i>
</div>

            <h1>لوحة التحكم</h1>
            <p class="subtitle">د. أحمد قنديل</p>
          </div>

          <form (ngSubmit)="login()" #f="ngForm" class="login-form">
            <div class="input-group">
              <i class="fas fa-user"></i>
              <input type="text" [(ngModel)]="username" name="username" placeholder="اسم المستخدم" required>
            </div>

            <div class="input-group">
              <i class="fas fa-lock"></i>
              <input type="password" [(ngModel)]="password" name="password" placeholder="كلمة المرور" required>
            </div>

            <button type="submit" class="btn-login" [disabled]="loading">
              <span *ngIf="!loading">دخول <i class="fas fa-arrow-right"></i></span>
              <span *ngIf="loading"><i class="fas fa-spinner fa-spin"></i> جاري...</span>
            </button>

            <div *ngIf="error" class="error-message">
              <i class="fas fa-exclamation-circle"></i> {{ error }}
            </div>
          </form>

          <div class="login-footer">
            <span>© 2026 جميع الحقوق محفوظة</span>
          </div>
        </div>
      </div>
    </div>
  `,
   styles: [
    `
    .login-page {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0f1e;
      overflow: hidden;
      font-family: 'Cairo', sans-serif;
    }

    .bg-animation {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.5;
      animation: floatOrb 8s ease-in-out infinite;
    }

    .orb-1 {
      width: 400px;
      height: 400px;
      background: #38bdf8;
      top: -100px;
      left: -100px;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 350px;
      height: 350px;
      background: #2dd4bf;
      bottom: -80px;
      right: -80px;
      animation-delay: -3s;
    }

    .orb-3 {
      width: 250px;
      height: 250px;
      background: #a855f7;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: -5s;
    }

    @keyframes floatOrb {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -30px) scale(1.05); }
      66% { transform: translate(-20px, 20px) scale(0.95); }
    }

    .login-wrapper {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 420px;
      padding: 20px;
      animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .login-card {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 2.5rem 2rem;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 25px 80px rgba(0,0,0,0.6);
      transition: all 0.3s ease;
    }

    .login-card:hover {
      box-shadow: 0 30px 90px rgba(56,189,248,0.1);
      border-color: rgba(56,189,248,0.15);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 2.8rem;
      color: #38bdf8;
      background: rgba(56,189,248,0.1);
      width: 70px;
      height: 70px;
      line-height: 70px;
      border-radius: 20px;
      margin-bottom: 1rem;
      animation: pulseGlow 3s ease-in-out infinite;
      overflow: hidden;
    }

    .logo-icon .logo-img {
      width: 62%;
      height: 62%;
      object-fit: contain;
      display: block;
      filter: drop-shadow(0 8px 20px rgba(56, 189, 248, 0.25));
    }

    /* 3D Tooth icon animation */
    .tooth-3d {
      position: relative;
      display: inline-grid;
      place-items: center;
      width: 70px;
      height: 70px;
    }

    .tooth-3d  {
      font-size: 2.8rem;
      color: #38bdf8;
      filter: drop-shadow(0 10px 18px rgba(0,0,0,0.35));
      transform-style: preserve-3d;
      transform: perspective(600px) rotateX(12deg) rotateY(-18deg);
      animation: toothFloat 3.2s ease-in-out infinite;
      text-shadow: 0 1px 0 rgba(255,255,255,0.55), 0 3px 0 rgba(56,189,248,0.12), 0 6px 0 rgba(56,189,248,0.22), 0 10px 18px rgba(0,0,0,0.35);
    }

    @keyframes toothFloat {
      0%, 100% { transform: perspective(600px) rotateX(12deg) rotateY(-18deg) translateY(0); }
      50% { transform: perspective(600px) rotateX(16deg) rotateY(-22deg) translateY(-6px); }
    }

    @media (prefers-reduced-motion: reduce) {
      .tooth-3d  { animation: none; }
    }

    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(56,189,248,0.15); }
      50% { box-shadow: 0 0 40px rgba(56,189,248,0.3); }
    }

    .login-header h1 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #f0f4f8;
      margin: 0.2rem 0;
    }

    .login-header .subtitle {
      color: #94a3b8;
      font-size: 0.9rem;
      margin: 0.2rem 0 0;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-group i {
      position: absolute;
      right: 14px;
      color: #64748b;
      font-size: 1rem;
      transition: color 0.3s ease;
    }

    .input-group input {
      width: 100%;
      padding: 14px 45px 14px 16px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      color: #f0f4f8;
      font-size: 1rem;
      transition: all 0.3s ease;
      outline: none;
      font-family: 'Cairo', sans-serif;
    }

    .input-group input:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56,189,248,0.15);
      background: rgba(255,255,255,0.08);
    }

    .input-group input:focus + i,
    .input-group input:focus ~ i {
      color: #38bdf8;
    }

    .input-group input::placeholder {
      color: #64748b;
    }

    .btn-login {
      padding: 14px;
      background: linear-gradient(135deg, #38bdf8, #2dd4bf);
      border: none;
      border-radius: 12px;
      color: white;
      font-weight: 600;
      font-size: 1.05rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: 'Cairo', sans-serif;
      margin-top: 0.5rem;
    }

    .btn-login:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(56,189,248,0.3);
    }

    .btn-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-login i {
      font-size: 0.9rem;
    }

    .error-message {
      margin-top: 0.5rem;
      padding: 10px 14px;
      background: rgba(239,68,68,0.1);
      border: 1px solid rgba(239,68,68,0.2);
      border-radius: 10px;
      color: #f87171;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: shake 0.4s ease;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }

    .login-footer {
      margin-top: 2rem;
      text-align: center;
      color: #475569;
      font-size: 0.75rem;
      border-top: 1px solid rgba(255,255,255,0.04);
      padding-top: 1.5rem;
    }

    @media (max-width: 480px) {
      .login-card { padding: 1.8rem 1.2rem; }
      .logo-icon { width: 60px; height: 60px; font-size: 2.2rem; }
      .login-header h1 { font-size: 1.4rem; }
      .login-wrapper { padding: 10px; }
    }
    `
  ]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loading = false;
  error = '';
  // logoUrl removed


  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService,
    private dataService: DashboardDataService
  ) {}

  ngOnInit() {
    // تم تعطيل تحميل صورة اللوجو في شاشة تسجيل الدخول.
    // الآن يتم عرض أيقونة ثابتة فقط (fas fa-tooth).
    // هذا يمنع عرض صورة د. أحمد داخل الأيقونة.
    
  }

  login() {

    if (!this.username || !this.password) return;
    this.loading = true;
    this.error = '';

    this.api.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.auth.setUser({ username: res.username, role: res.role });
        this.toast.show('مرحباً بك في لوحة التحكم', 'success');

        // حمّل كل بيانات الداشبورد مرة واحدة هنا، قبل الدخول للوحة التحكم،
        // عشان كل صفحة تلاقي بياناتها جاهزة فورًا من غير أي انتظار أو ضغط إضافي.
        this.dataService.loadAll().subscribe({
          next: () => this.router.navigate(['/dashboard']),
          error: () => this.router.navigate(['/dashboard']) // لو فشل التحميل المسبق، ادخل برضو وكل صفحة هتحاول تحمل بياناتها بنفسها
        });
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'بيانات الدخول غير صحيحة';
        this.toast.show(this.error, 'error');
      }
    });
  }
}

