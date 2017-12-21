import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Injectable()
// tslint:disable-next-line:class-name
export class guestAccess implements CanActivate {
  constructor(private router: Router) {}

  get token() {
    return localStorage.getItem("token");
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (true /* this.token */) {
      this.router.navigateByUrl("/dashboard/home");
    }
    return true;
  }
}
