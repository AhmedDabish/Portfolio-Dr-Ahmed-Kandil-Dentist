import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private subject = new Subject<ToastMessage>();
  toast$ = this.subject.asObservable();

  show(text: string, type: 'success' | 'error' | 'info' = 'success') {
    this.subject.next({ text, type });
    setTimeout(() => this.subject.next({ text: '', type: 'info' }), 4000);
  }
}

