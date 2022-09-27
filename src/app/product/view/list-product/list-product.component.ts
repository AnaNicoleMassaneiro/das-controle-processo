import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductModel } from "src/app/product/models/product.model";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.scss"],
})
export class ListProductComponent implements OnInit {
  public registrations: ProductModel[] = [];
  public regModel!: ProductModel;
  public showNew: Boolean = false;
  public submitType: string = "Save";
  public selectedRow!: number;
  public product?: ProductModel[];

  constructor(
    private router: Router,
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.listProducts();
  }

  listProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.registrations = data;
      },
      error: (e) => console.error(e),
    });
  }

  onNew() {
    this.regModel = new ProductModel();
    this.submitType = "Save";
    this.showNew = true;
  }

  onEdit(index: number) {
    this.router.navigate(["/registration-product", index]);
  }

  onDelete(index: number, content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          if (result == "ok") {
            this.isDelete(index);
          }
        },
        (reason) => {}
      );
  }

  isDelete(index: number) {
    this.productService.delete(index).subscribe({
      next: (res) => {
        this.reloadCurrentRoute();
      },
      error: (e) => console.error(e),
    });
  }

  onCancel() {
    this.showNew = false;
  }

  callModal() {
    this.router.navigate(["/registration-product"]);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
