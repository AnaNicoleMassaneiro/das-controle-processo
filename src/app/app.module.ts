import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from "./navbar/navbar.component";
import { ListClientComponent } from "./client/view/list-client/list-client.component";
import { HttpClientModule } from "@angular/common/http";
import { RegistrationClientComponent } from "./client/view/registration-client/registration.client.component";
import { ListProductComponent } from "./product/view/list-product/list-product.component";
import { RegistrationProductComponent } from "./product/view/registration-product/registration.product.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrationClientComponent,
    ListClientComponent,
    ListProductComponent,
    RegistrationProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
