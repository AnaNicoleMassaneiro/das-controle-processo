import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListClientComponent } from "./client/list-client/list-client.component";
import { RegistrationClientComponent } from "./client/registration-client/registration.client.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "list-client", component: ListClientComponent },
  { path: "registration-client", component: RegistrationClientComponent },
  { path: "registration-client/:id", component: RegistrationClientComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
