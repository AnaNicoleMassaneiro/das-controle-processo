import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ProductModel } from "src/app/product/models/product.model";
import { ProductService } from "src/app/product/services/product.service";
import { Location } from '@angular/common';

@Component({
  selector: "registration-product",
  templateUrl: "./registration-product.component.html",
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

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.verifyRoute();
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
      this.regModel = new ProductModel();
      this.submitType = "Save";
      this.showNew = true;
    }
  }

  searchRegistry() {
    this.productService.get(this.idEdit).subscribe({
      next: (data) => {
        this.regModel = data;
      },
      error: (e) => console.error(e),
    });
  }

  newSave() {
    const data = {
      descricao: this.regModel.descricao,
    };

    this.productService.create(data).subscribe({
      next: (res) => {
        this.sucessSave();
      },
      error: (e) => {
        this.errorSave();
        console.error(e);
      },
    });
  }

  editSave() {
    const data = {
      id: this.idEdit,
      descricao: this.regModel.descricao,
    };

    this.productService.update(data).subscribe({
      next: (res) => {
        this.sucessSave();
        this.message = res.message
          ? res.message
          : "This tutorial was updated successfully!";
      },
      error: (e) => {
        console.error(e);
        this.errorSave();
      },
    });
  }

  onCancel() {
    this.location.back();
  }

  sucessSave() {
    this.modalService.open("Sucesso ao Salvar produto", {
      ariaLabelledBy: "modal-basic-title",
    });
    this.router.navigate(["/list-product"]);
  }

  errorSave() {
    this.modalService.open("Erro ao Salvar produto", {
      ariaLabelledBy: "modal-basic-title",
    });
  }
}
