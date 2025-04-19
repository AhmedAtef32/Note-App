import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notLoggedGuard: CanActivateFn = () => {
  const  pLATFORM_ID = inject(PLATFORM_ID)
  const  router = inject(Router)

  if(isPlatformBrowser(pLATFORM_ID)){

   const token = localStorage.getItem('NoteToken');

   if(token){

     return true
   }else{
    router.navigate(['/login'])
     return false
   }
  }

   return false;
  };
