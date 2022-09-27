import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ProductModel } from "src/app/product/models/product.model";
import { ProductService } from "src/app/product/services/product.service";
import { Location } from "@angular/common";

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

  onSave(content: any) {
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

  newSave(content: any) {
    const data = {
      descricao: this.regModel.descricao,
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
    const data = {
      id: this.idEdit,
      descricao: this.regModel.descricao,
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
        this.errorSave();
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
