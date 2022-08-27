import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

  constructor(private router: Router, private productService: ProductService) {}

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

  onDelete(index: number) {
    this.productService.delete(index).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(["/list-product"]);
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
}
