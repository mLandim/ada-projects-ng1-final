import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { catchError, count, delay, retry, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService)
  const token = storageService.getToken()?.toString()
  const router = inject(Router)
  req = req.clone({
    withCredentials: true,
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

 
  return next(req).pipe(
    retry({ count: 2, delay: 1000}),
    catchError((err: HttpErrorResponse) => {
      router.navigate(['/erro', err.status], {
        queryParams: { mensagem: err.message}
      })
      return throwError(() => err)
    })
  );
};
