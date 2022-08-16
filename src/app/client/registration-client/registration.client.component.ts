import { Component, OnInit } from "@angular/core";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ClientModel } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "registration-client",
  templateUrl: "./registration-client.component.html",
})
export class RegistrationClientComponent implements OnInit {
  closeResult = "";
  public registrations: ClientModel[] = [];
  public regModel!: ClientModel;
  public showNew: Boolean = false;
  public submitType: string = "Salvar";
  public selectedRow!: number;

  constructor(public clientService: ClientService) {}

  ngOnInit() {
    this.onNew();
  }

  onSave() {
    this.newSave();
  /*   if (this.submitType === "Salvar") {
      this.newSave();
    } else {
      this.registrations[this.selectedRow].name = this.regModel.name;
      this.registrations[this.selectedRow].sobrenome = this.regModel.sobrenome;
      this.registrations[this.selectedRow].cpf = this.regModel.cpf;
    } */

    this.showNew = false;
  }

  onNew() {
    this.regModel = new ClientModel();
    this.submitType = "Save";
    this.showNew = true;
  }

  newSave() {
    console.log(this.regModel);
    const data = {
      name: this.regModel.name,
      sabrenome: this.regModel.sobrenome,
      cpf: this.regModel.cpf,
    };

    this.clientService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        //this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  onCancel() {
    this.showNew = false;
  }
}
