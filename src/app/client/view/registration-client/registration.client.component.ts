import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ClientModel } from "src/app/client/models/client.model";
import { ClientService } from "src/app/client/services/client.service";
import { Location } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "registration-client",
  templateUrl: "./registration-client.component.html",
  styleUrls: ["./registration-client.component.scss"],
})
export class RegistrationClientComponent implements OnInit {
  closeResult = "";
  public registrations: ClientModel[] = [];
  public showNew: Boolean = false;
  public submitType: string = "Salvar";
  public selectedRow!: number;
  public idEdit!: number;
  public message = "";
  public formRegister!: FormGroup;
  submitted = false;

  constructor(
    public clientService: ClientService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.verifyRoute();
    this.initForm();
  }

  initForm() {
    this.formRegister = this.formBuilder.group({
      name: ["", Validators.required],
      sobrenome: ["", Validators.required],
      cpf: ["", Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formRegister.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.formRegister.reset();
  }

  verifyRoute() {
    const routeParams = this.route.snapshot.paramMap;

    this.idEdit = Number(routeParams.get("id"));

    this.verifyIsNew();
  }

  onSubmit(content: any) {
    if (this.idEdit) {
      this.editSave(content);
    } else {
      this.newSave(content);
    }

    this.showNew = false;
  }

  verifyIsNew() {
    if (this.idEdit) {
      this.searchRegistry();
    } else {
      this.submitType = "Save";
      this.showNew = true;
    }
  }

  searchRegistry() {
    this.clientService.get(this.idEdit).subscribe({
      next: (data) => {
        const { name, sobrenome, cpf } = data;

        this.formRegister = this.formBuilder.group({
          name: [name, Validators.required],
          sobrenome: [sobrenome, Validators.required],
          cpf: [cpf, Validators.required],
        });

        this.formRegister.setValue({ name, sobrenome, cpf });
      },
      error: (e) => console.error(e),
    });
  }

  newSave(content: any) {
    this.submitted = true;

    if (this.formRegister.invalid) {
      return;
    }

    const { name, sobrenome, cpf } = this.formRegister.value;

    const data = {
      name: name,
      sobrenome: sobrenome,
      cpf: cpf,
    };

    this.clientService.create(data).subscribe({
      next: (res) => {
        this.sucessSave(content);
      },
      error: (e) => {
        this.errorSave();
        console.error(e);
      },
    });
  }

  editSave(content: any) {
    const { name, sobrenome, cpf } = this.formRegister.value;

    const data = {
      name: name,
      sobrenome: sobrenome,
      cpf: cpf,
    };

    this.clientService.update(data).subscribe({
      next: (res) => {
        this.sucessSave(content);
        this.message = res.message
          ? res.message
          : "This tutorial was updated successfully!";
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  onCancel() {
    this.location.back();
  }

  sucessSave(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {}
      );

    this.router.navigate(["/list-client"]);
  }

  errorSave() {
    this.modalService.open("Erro ao Salvar Cliente", {
      ariaLabelledBy: "modal-basic-title",
    });
  }
}
