import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import { ApiService } from "./../api-service";
import { Router } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";

@Injectable() // tslint:disable-next-line:class-name
export class haveAccess implements CanActivate {
  get token() {
    return localStorage.getItem("token");
  }

  constructor(
    private http: Http,
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    /* if (false /* !this.token ) {
      this.router.navigateByUrl("/login");
      return false;
    } */
    return true;
  }
}
