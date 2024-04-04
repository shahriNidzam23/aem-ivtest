import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private storage: StorageService, private router: Router){}


  public static isAuthenticated() {
    return AuthenticatedGuard;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise(async (resolve, reject) => {
      const isReverted = state.url == "/sign-in";

      const authenticated = await this.storage.get(this.storage.AUTH);

      if(!authenticated && !isReverted) {
        this.router.navigate(['/sign-in']);
      }

      if(authenticated && isReverted) {
        this.router.navigate(['/dashboard']);
      }

      resolve(isReverted ? !authenticated : authenticated);

    });
  }

}
