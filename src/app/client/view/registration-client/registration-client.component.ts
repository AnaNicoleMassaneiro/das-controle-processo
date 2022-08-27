import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { ClientModel } from "src/app/client/models/client.model";
import { ClientService } from "src/app/client/services/client.service";

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
  public idEdit!: number;
  public message = "";

  constructor(
    public clientService: ClientService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.verifyRoute();
  }

  open(content: any) {
    this.modalService.open(content);
  }

  verifyRoute() {
    const routeParams = this.route.snapshot.paramMap;

    this.idEdit = Number(routeParams.get("id"));

    this.verifyIsNew();
  }

  onSave() {
    if (this.idEdit) {
      this.editSave();
    } else {
      this.newSave();
    }

    this.showNew = false;
  }

  verifyIsNew() {
    if (this.idEdit) {
      this.searchRegistry();
    } else {
      this.regModel = new ClientModel();
      this.submitType = "Save";
      this.showNew = true;
    }
  }

  searchRegistry() {
    this.clientService.get(this.idEdit).subscribe({
      next: (data) => {
        this.regModel = data;
      },
      error: (e) => console.error(e),
    });
  }

  newSave() {
    const data = {
      name: this.regModel.name,
      sobrenome: this.regModel.sobrenome,
      cpf: this.regModel.cpf,
    };

    this.clientService.create(data).subscribe({
      next: (res) => {
        this.open('teste');
      },
      error: (e) => console.error(e),
    });
  }

  editSave() {
    const data = {
      id: this.idEdit,
      name: this.regModel.name,
      sobrenome: this.regModel.sobrenome,
      cpf: this.regModel.cpf,
    };

    this.clientService.update(data).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : "This tutorial was updated successfully!";
      },
      error: (e) => console.error(e),
    });
  }

  onCancel() {
    this.showNew = false;
  }
}