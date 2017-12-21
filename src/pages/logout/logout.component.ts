import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private myLocalStorage: LocalStorageService, private router: Router) {
    localStorage.removeItem('token');
    localStorage.removeItem('my-app.token');
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {

  }

}
