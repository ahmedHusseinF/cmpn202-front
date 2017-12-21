import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../pages/login/login.component";

import { LayoutComponent } from "./layouts/layout/layout.component";
import { HomeComponent } from "../pages/home/home.component";
import { CashInComponent } from "../pages/cash-in/cash-in.component";
import { CashOutComponent } from "../pages/cash-out/cash-out.component";
import { Request2PayComponent } from "../pages/r2p/request-pay/request-pay.component";
import { CreateMerchantComponent } from "../pages/registration/create-merchant/create-merchant.component";
import { CreateConsumerComponent } from "../pages/registration/create-consumer/create-consumer.component";
import { SearchWalletUserComponent } from "../pages/search-wallet-user/search-wallet-user.component";
import { TransactionHistoryComponent } from "../pages/transaction-history/transaction-history.component";
import { LogoutComponent } from "../pages/logout/logout.component";
import { SearchResultComponent } from "../pages/search.result/search.component";
import { PurchaseComponent } from "../pages/purchase/purchase.component";
import { DepositSingleComponent } from "../pages/deposit/single/single.component";
import { DepositBulkComponent } from "../pages/deposit/bulk/bulk.component";
import { BulkRequestComponent } from "../pages/r2p/bulk-request/bulk-request.component";
import { QrCode } from "../pages/qr-code/qr-code.component";
import { CreateMerchantProfileComponent } from "../pages/merchant-profile/create-profile/create.component";
import { guestAccess } from "./services/access-controls/guest.service";
import { haveAccess } from "./services/access-controls/have-access.service";
import { ProfileComponent } from "../pages/profile/profile.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  } ,
  {
    path: "dashboard",
    component: LayoutComponent,
    canActivate: [haveAccess],
    data: {
      title: "Home"
    },
    children: [
      {
        path: "cash-in",
        component: CashInComponent,
        canActivate: [haveAccess]
      },
      {
        path: "cash-out",
        component: CashOutComponent,
        canActivate: [haveAccess]
      },
      {
        path: "single-request",
        component: Request2PayComponent,
        canActivate: [haveAccess]
      },
      {
        path: "bulk-request",
        component: BulkRequestComponent,
        canActivate: [haveAccess]
      },
      {
        path: "create-merchant",
        component: CreateMerchantComponent,
        canActivate: [haveAccess]
      },
      {
        path: "create-consumer",
        component: CreateConsumerComponent,
        canActivate: [haveAccess]
      },
      {
        path: "home",
        component: HomeComponent,
        canActivate: [haveAccess]
      },
      {
        path: "search-wallet-user",
        component: SearchWalletUserComponent,
        canActivate: [haveAccess]
      },
      {
        path: "transaction-history",
        component: TransactionHistoryComponent,
        canActivate: [haveAccess]
      },
      {
        path: "search-result",
        component: SearchResultComponent,
        canActivate: [haveAccess]
      },
      {
        path: "purchase",
        component: PurchaseComponent,
        canActivate: [haveAccess]
      },
      {
        path: "deposit-single",
        component: DepositSingleComponent,
        canActivate: [haveAccess]
      },
      {
        path: "deposit-bulk",
        component: DepositBulkComponent,
        canActivate: [haveAccess]
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [haveAccess]
      },
      {
        path: "qrcode",
        component: QrCode,
        canActivate: [haveAccess]
      },
      {
        path: "merchant/profile/create",
        component: CreateMerchantProfileComponent,
        canActivate: [haveAccess]
      }
    ]
  },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [haveAccess]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
