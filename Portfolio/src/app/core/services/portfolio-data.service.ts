// // // import { HttpClient } from '@angular/common/http';
// // // import { Injectable } from '@angular/core';
// // // import { Observable } from 'rxjs';

// // // import { environment } from '../../../environments/environment';
// // // import { ContactMessagePayload, PublicPortfolioData } from '../models/portfolio.models';

// // // @Injectable({ providedIn: 'root' })
// // // export class PortfolioDataService {
// // //   private base = environment.apiUrl;

// // //   constructor(private http: HttpClient) {}

// // //   getPortfolioData(): Observable<PublicPortfolioData> {
// // //     // endpoint: /public/portfolio-data
// // //     return this.http.get<PublicPortfolioData>(`${this.base}/public/portfolio-data`);

// // //   }

// // //   submitContactMessage(payload: ContactMessagePayload): Observable<any> {
// // //     return this.http.post(`${this.base}/public/contact-message`, payload);
// // //   }
// // // }

// // import { HttpClient } from '@angular/common/http';
// // import { Injectable } from '@angular/core';
// // import { Observable, throwError } from 'rxjs';
// // import { catchError, retry, timeout } from 'rxjs/operators';

// // import { environment } from '../../../environments/environment';
// // import { ContactMessagePayload, PublicPortfolioData } from '../models/portfolio.models';

// // @Injectable({ providedIn: 'root' })
// // export class PortfolioDataService {
// //   private base = environment.apiUrl;

// //   constructor(private http: HttpClient) {}

// //   getPortfolioData(): Observable<PublicPortfolioData> {
// //     // endpoint: /public/portfolio-data
// //     return this.http.get<PublicPortfolioData>(`${this.base}/public/portfolio-data`).pipe(
// //       timeout(15000), // لو الطلب طوّل أكتر من 15 ثانية، اعتبره فشل
// //       retry({ count: 2, delay: 1500 }), // حاول تاني لحد مرتين، كل محاولة بعد 1.5 ثانية
// //       catchError(err => {
// //         console.error('Failed to load portfolio data:', err);
// //         return throwError(() => err);
// //       })
// //     );
// //   }

// //   submitContactMessage(payload: ContactMessagePayload): Observable<any> {
// //     return this.http.post(`${this.base}/public/contact-message`, payload).pipe(
// //       timeout(15000),
// //       catchError(err => {
// //         console.error('Failed to submit contact message:', err);
// //         return throwError(() => err);
// //       })
// //     );
// //   }
// // }
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry, timeout } from 'rxjs/operators';

// import { environment } from '../../../environments/environment';
// import { ContactMessagePayload, PublicPortfolioData } from '../models/portfolio.models';

// @Injectable({ providedIn: 'root' })
// export class PortfolioDataService {
//   private base = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   getPortfolioData(): Observable<PublicPortfolioData> {
//     return this.http.get<PublicPortfolioData>(`${this.base}/public/portfolio-data`).pipe(
//       timeout(15000),
//       retry({ count: 3, delay: 1500 }),
//       catchError(err => this.logAndRethrow('getPortfolioData', err))
//     );
//   }

//   submitContactMessage(payload: ContactMessagePayload): Observable<any> {
//     return this.http.post(`${this.base}/public/contact-message`, payload).pipe(
//       timeout(15000),
//       catchError(err => this.logAndRethrow('submitContactMessage', err))
//     );
//   }

//   // بيطبع في الـ Console سبب الفشل الحقيقي (status = 0 يعني الطلب مش وصل للسيرفر أصلاً،
//   // غالباً بسبب شهادة SSL مش موثوقة أو السيرفر واقف/بيعمل ريستارت).
//   private logAndRethrow(context: string, err: unknown) {
//     if (err instanceof HttpErrorResponse) {
//       if (err.status === 0) {
//         console.error(
//           `[${context}] الطلب فشل قبل ما يوصل السيرفر أصلاً (status 0). ` +
//           `الأسباب الشائعة: 1) شهادة HTTPS المحلية مش موثوقة (شغّل: dotnet dev-certs https --trust) ` +
//           `2) الباك اند مش شغال أو بيعمل ريستارت (dotnet watch) ` +
//           `3) مشكلة CORS. افتح ${this.base}/public/portfolio-data مباشرة في تاب جديد للتأكد.`,
//           err
//         );
//       } else {
//         console.error(`[${context}] فشل بـ HTTP status ${err.status}:`, err.message, err.error);
//       }
//     } else {
//       console.error(`[${context}] خطأ غير متوقع:`, err);
//     }
//     return throwError(() => err);
//   }
// }
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ContactMessagePayload, PublicPortfolioData } from '../models/portfolio.models';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // getPortfolioData(): Observable<PublicPortfolioData> {
  //   return this.http.get<PublicPortfolioData>(`${this.base}/public/portfolio-data`).pipe(
  //     timeout(30000),                           // زيادة المهلة
  //     retry({ count: 3, delay: 2000 }),         // إعادة المحاولة بعد 2 ثانية
  //     catchError(this.handleError)
  //   );
  // }

getPortfolioData(): Observable<PublicPortfolioData> {
  const headers = new HttpHeaders({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  return this.http.get<PublicPortfolioData>(`${this.base}/public/portfolio-data`, { headers })
    .pipe(
      timeout(30000),
      retry({ count: 3, delay: 2000 }),
      catchError(this.handleError)
    );
}
  submitContactMessage(payload: ContactMessagePayload): Observable<any> {
    return this.http.post(`${this.base}/public/contact-message`, payload).pipe(
      timeout(30000),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMsg = 'حدث خطأ غير متوقع';
    if (err.status === 0) {
      errorMsg = 'لا يمكن الاتصال بالخادم. تأكد من تشغيل الخادم الخلفي.';
    } else if (err.status >= 400 && err.status < 500) {
      errorMsg = err.error?.message || 'خطأ في الطلب';
    } else if (err.status >= 500) {
      errorMsg = 'خطأ داخلي في الخادم، حاول لاحقاً';
    }
    console.error('Error in PortfolioDataService:', err);
    return throwError(() => new Error(errorMsg));
  }



addTestimonial(payload: { author: string; text: string }): Observable<any> {
  return this.http.post(`${this.base}/public/testimonials`, payload).pipe(
    timeout(30000),
    catchError(this.handleError)
  );
}


}