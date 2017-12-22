import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../pages/login/login.component";

import { LayoutComponent } from "./layouts/layout/layout.component";
import { HomeComponent } from "../pages/home/home.component";
import { CreateMerchantComponent } from "../pages/registration/create-merchant/create-merchant.component";
import { CreateConsumerComponent } from "../pages/registration/create-consumer/create-consumer.component";
import { LogoutComponent } from "../pages/logout/logout.component";
import { guestAccess } from "./services/access-controls/guest.service";
import { haveAccess } from "./services/access-controls/have-access.service";
import { ProfileComponent } from "../pages/profile/profile.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    canActivate: [haveAccess],
    data: {
      title: "Home"
    },
    children: [
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
        path: "profile",
        component: ProfileComponent,
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
