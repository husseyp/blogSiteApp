import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilsService } from '../services/utils/utils.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const utilsService: UtilsService = inject(UtilsService);

   let token = utilsService.decrypt(JSON.parse(localStorage.getItem('userToken') || '{}'));
   let beforeLoginRoutes = ['/login','/register','/'];
   let afterLoginRoutes = ['/blog-data']


   if(!token && afterLoginRoutes.includes(state.url)) {
    router.navigate(['/'])
    return false;
   }else if(token) {
      utilsService.login();
      if(beforeLoginRoutes.includes(state.url)) {
        router.navigate(['/blog-data']);
        return false
      }else {
       return true
      }
   }
   else {
    return true
   }

   
};
