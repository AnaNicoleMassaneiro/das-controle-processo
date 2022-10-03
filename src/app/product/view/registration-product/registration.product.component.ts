import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ProductModel } from "src/app/product/models/product.model";
import { ProductService } from "src/app/product/services/product.service";
import { Location } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "registration-product",
  templateUrl: "./registration-product.component.html",
  styleUrls: ["./registration-product.component.scss"],
})
export class RegistrationProductComponent implements OnInit {
  closeResult = "";
  public registrations: ProductModel[] = [];
  public regModel!: ProductModel;
  public showNew: Boolean = false;
  public submitType: string = "Salvar";
  public selectedRow!: number;
  public idEdit!: number;
  public message = "";
  public formRegister!: FormGroup;
  submitted = false;

  constructor(
    public productService: ProductService,
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
      descricao: ["", Validators.required],
    });
  }

  verifyRoute() {
    const routeParams = this.route.snapshot.paramMap;

    this.idEdit = Number(routeParams.get("id"));

    this.verifyIsNew();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formRegister.controls;
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
    this.productService.get(this.idEdit).subscribe({
      next: (data) => {
        const { descricao } = data;

        this.formRegister = this.formBuilder.group({
          descricao: [descricao, Validators.required],
        });

        this.formRegister.setValue({ descricao });
      },
      error: (e) => console.error(e),
    });
  }

  newSave(content: any) {
    this.submitted = true;

    if (this.formRegister.invalid) {
      return;
    }

    const { descricao } = this.formRegister.value;

    const data = {
      descricao: descricao,
    };

    this.productService.create(data).subscribe({
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
    const { descricao } = this.formRegister.value;

    const data = {
      descricao: descricao,
      id: this.idEdit,
    };

    this.productService.update(data).subscribe({
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

    this.router.navigate(["/list-product"]);
  }

  errorSave() {
    this.modalService.open("Erro ao Salvar produto", {
      ariaLabelledBy: "modal-basic-title",
    });
  }
}
