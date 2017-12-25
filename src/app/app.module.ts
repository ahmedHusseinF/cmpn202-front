import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "../pages/login/login.component";
import "ngx-bootstrap";
import { HttpModule } from "@angular/http";
import { LocalStorageModule } from "angular-2-local-storage";
import { RouterModule, Routes } from "@angular/router";
import { Daterangepicker } from "ng2-daterangepicker";
//flash
import { FlashMessagesService } from "angular2-flash-messages";
//loading
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BusyModule } from "angular2-busy";

//Modal
import { ModalModule } from "ngx-bootstrap";
import { ModalContentComponent } from "./services/modal.service";

//layouts
import { LayoutComponent } from "./layouts/layout/layout.component";

//components
import { HomeComponent } from "../pages/home/home.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { CreateMerchantComponent } from "../pages/registration/create-merchant/create-merchant.component";
import { CreateConsumerComponent } from "../pages/registration/create-consumer/create-consumer.component";
import { ProfileComponent } from "./../pages/profile/profile.component";
import { LogoutComponent } from "../pages/logout/logout.component";
import { CreateMachineComponent } from "../pages/machines/create/create-machine.component";

//services
import { LoginService } from "./services/login.service";
import { ApiService } from "./services/api-service";

import { dashBoardService } from "./services/dash-board.service";

import { MerchantService } from "./services/merchant.service";
import { guestAccess } from "./services/access-controls/guest.service";
import { haveAccess } from "./services/access-controls/have-access.service";
import { UpdateService } from "./services/update.user.service";
import { ProfileService } from "./services/profile.service";
import { GlobalVariablesService } from "./services/global-variables.service";

//pipe
import { CapitalizeFirstPipe } from "./services/pipe/capitalizefirst.pipe";

//routing
import { AppRoutingModule } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateMerchantComponent,
    CreateConsumerComponent,
    ProfileComponent,
    LayoutComponent,
    ModalContentComponent,
    LogoutComponent,
    CreateMachineComponent
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
      prefix: "my-app",
      storageType: "localStorage"
    }),
    Daterangepicker,
    BusyModule,
    ModalModule.forRoot()
  ],
  providers: [
    LoginService,
    ApiService,
    FlashMessagesService,
    ProfileService,
    dashBoardService,
    MerchantService,
    guestAccess,
    haveAccess,
    UpdateService,
    GlobalVariablesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent]
})
export class AppModule {}
