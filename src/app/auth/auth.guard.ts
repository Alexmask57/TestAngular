import {CanActivateFn, Router} from '@angular/router';
import {map, take} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  return inject(AuthService).currentUser.pipe(
    take(1),
    map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    })
  )
};
