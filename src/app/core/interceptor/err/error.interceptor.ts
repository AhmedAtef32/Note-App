import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService)
  const router = inject(Router)

  if(router.url ==='/home'){

  return next(req);
}else{
  return next(req).pipe(catchError((err) => {
    return throwError(() => toastrService.error(err.error.message));
  }));
}

};
