import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const pLATFORM_ID = inject(PLATFORM_ID)
  if(isPlatformBrowser(pLATFORM_ID)){
    const token = '3b8ny__'+localStorage.getItem('NoteToken');
    req = req.clone({
      setHeaders: {
        token : token
      }
    })
  }

  return next(req);
};
