import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from "./navbar/navbar.component";
import { ListClientComponent } from "./client/view/list-client/list-client.component";
import { HttpClientModule } from "@angular/common/http";
import { RegistrationClientComponent } from "./client/view/registration-client/registration.client.component";
import { ListProductComponent } from "./product/view/list-product/list-product.component";
import { RegistrationProductComponent } from "./product/view/registration-product/registration.product.component";
import { RegistrationOrderComponent } from './order/view/registration-order/registration-order.component';
import { ListOrderComponent } from './order/view/list-order/list-order.component';
import { NgxCpfCnpjModule } from "ngx-cpf-cnpj";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "./modal/modal.component";
import { HomeComponent } from './home/home.component';
import { CpfPipe } from "./utils/validation.ts/cpf.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrationClientComponent,
    ListClientComponent,
    ListProductComponent,
    RegistrationProductComponent,
    ModalComponent,
    RegistrationOrderComponent,
    ListOrderComponent,
    HomeComponent,
    CpfPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgxCpfCnpjModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
