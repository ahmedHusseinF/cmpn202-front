import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from '../pages/login/login.component';
import 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { RouterModule, Routes } from '@angular/router';
import { Daterangepicker } from 'ng2-daterangepicker';
//flash
import { FlashMessagesService } from 'angular2-flash-messages';
//loading
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';

//Modal
import { ModalModule } from 'ngx-bootstrap';
import { ModalContentComponent } from './services/modal.service';
import { DepositePurchase } from './modals/deposit-purchase/deposit-purchase.component';

//layouts
import { LayoutComponent } from './layouts/layout/layout.component';

//components
import { HomeComponent } from '../pages/home/home.component';
import { CashInComponent } from '../pages/cash-in/cash-in.component';
import { CashOutComponent } from '../pages/cash-out/cash-out.component';
import { Request2PayComponent } from '../pages/r2p/request-pay/request-pay.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CreateMerchantComponent } from '../pages/registration/create-merchant/create-merchant.component';
import { CreateConsumerComponent } from '../pages/registration/create-consumer/create-consumer.component';
import { SearchWalletUserComponent } from '../pages/search-wallet-user/search-wallet-user.component';
import { TransactionHistoryComponent } from '../pages/transaction-history/transaction-history.component';
import { LogoutComponent } from '../pages/logout/logout.component';
import { SearchResultComponent } from '../pages/search.result/search.component';
import { PurchaseComponent } from '../pages/purchase/purchase.component';
import { DepositSingleComponent } from '../pages/deposit/single/single.component';
import { DepositBulkComponent } from '../pages/deposit/bulk/bulk.component';
import { BulkRequestComponent } from '../pages/r2p/bulk-request/bulk-request.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { QrCode } from '../pages/qr-code/qr-code.component';
import { CreateMerchantProfileComponent } from '../pages/merchant-profile/create-profile/create.component';

//services
import { LoginService } from './services/login.service';
import { ApiService } from './services/api-service';
import { SearchService } from './services/search-service';
import { CashInService } from './services/cash-in.service';
import { CashOutService } from './services/cash-out.service';
import { CashService } from './services/cash-services';

import { Request2PayService } from './services/request-pay.service';
import { dashBoardService } from './services/dash-board.service';

import { ConsumerService } from './services/consumer.service';
import { MerchantService } from './services/merchant.service';
import { guestAccess } from './services/access-controls/guest.service';
import { haveAccess } from './services/access-controls/have-access.service';
import { UpdateService } from './services/update.user.service';
import { HistoryService } from './services/history.service';
import { ProfileService } from './services/profile.service';
import { GlobalVariablesService } from './services/global-variables.service';
import { GenerateQrcodeService } from './services/generate-qrcode.service';

//pipe
import { CapitalizeFirstPipe } from './services/pipe/capitalizefirst.pipe';


//routing
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CashInComponent,
    CashOutComponent,
    Request2PayComponent,
    CreateMerchantComponent,
    CreateConsumerComponent,
    SearchWalletUserComponent,
    LayoutComponent,
    TransactionHistoryComponent,
    LogoutComponent,
    SearchResultComponent,
    ModalContentComponent,
    PurchaseComponent,
    DepositSingleComponent,
    DepositBulkComponent,
    BulkRequestComponent,
    DepositePurchase,
    CapitalizeFirstPipe,
    ProfileComponent,
    QrCode,
    CreateMerchantProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage',
    }),
    Daterangepicker,
    BusyModule,
    ModalModule.forRoot(),
  ],
  providers: [LoginService, ApiService, SearchService, FlashMessagesService, ProfileService, CashService,
    CashInService, CashOutService, dashBoardService, ConsumerService, MerchantService, Request2PayService,
    guestAccess, haveAccess, UpdateService, HistoryService, GlobalVariablesService,
    GenerateQrcodeService],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent, DepositePurchase]
})
export class AppModule { }
