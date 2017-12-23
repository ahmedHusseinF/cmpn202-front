import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from 'angular-2-local-storage';
import { dashBoardService } from '../../app/services/dash-board.service';
import { GlobalVariablesService } from '../../app/services/global-variables.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocalStorageService]

})
export class HomeComponent implements OnInit {
  dashBoard: any = {};
  num: number = 200;
  show: boolean = true;

  balance: any;

  constructor(private title: Title, private localStorage: LocalStorageService,
    private service: dashBoardService, private globals: GlobalVariablesService) {
    this.title.setTitle("Home");
  }

  ngOnInit() {
    this.dashBoard.allAgentTransactions = []
    //this.getdashboard();
  }

  getdashboard(){
    this.globals.unSubscribe(this.service.dashBoard().subscribe((res => {
      if (res.status == 200) {
        this.dashBoard = res.data.message;
        this.globals.update('current_balance', this.dashBoard.current_balance);
      }
      else {
        this.dashBoard = {};
        alert('Something Went Wrong')
      }
      console.log(this.dashBoard)
    })));

  }
  ngOnDestroy() {
    this.globals.unSubscribe();
  }

}
