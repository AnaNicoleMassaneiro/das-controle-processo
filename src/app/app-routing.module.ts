import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListClientComponent } from "./client/view/list-client/list-client.component";
import { RegistrationClientComponent } from "./client/view/registration-client/registration.client.component";
import { ListProductComponent } from "./product/view/list-product/list-product.component";
import { RegistrationProductComponent } from "./product/view/registration-product/registration.product.component";

const routes: Routes = [
  { path: "", component: ListClientComponent },
  { path: "list-client", component: ListClientComponent },
  { path: "registration-client", component: RegistrationClientComponent },
  { path: "registration-client/:id", component: RegistrationClientComponent },
  { path: "list-product", component: ListProductComponent },
  { path: "registration-product", component: RegistrationProductComponent },
  { path: "registration-product/:id", component: RegistrationProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
