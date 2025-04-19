import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loogedGuard: CanActivateFn = () => {


const  pLATFORM_ID = inject(PLATFORM_ID)
const  router = inject(Router)

  if(isPlatformBrowser(pLATFORM_ID)){

   const token:string = localStorage.getItem('NoteToken')!;

   if(token){
    router.navigate(['/home'])
     return false

   }else{
     return true
   }
  }

   return false;









};
