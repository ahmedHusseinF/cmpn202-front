import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CashService } from '../../services/cash-services';
import { GlobalVariablesService } from '../../services/global-variables.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
	constructor(
		private cdRef: ChangeDetectorRef,
		public api: ApiService,
		private cashService: CashService,
		public globals:GlobalVariablesService) { }

	ngOnInit() {
	}

	//used to remove loading error
	ngAfterViewChecked() {
		this.api.loading;
		this.cdRef.detectChanges();
	}

	getUser() {
		return {
			name: localStorage.getItem('username')
		};
	}

	getLogoUrl() {
		let baseUrl = this.api.baseUrl.replace('http://', '');
		return baseUrl + localStorage.getItem('logoUrl');
	}

	LogoExist() {
		return localStorage.getItem('logoUrl') != 'null';
	}

}
