import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientModel } from "src/app/client/models/client.model";
import { ClientService } from "src/app/client/services/client.service";
import { ProductModel } from "src/app/product/models/product.model";
import { ProductService } from "src/app/product/services/product.service";

@Component({
  selector: "app-list-order",
  templateUrl: "./list-order.component.html",
  styleUrls: ["./list-order.component.scss"],
})
export class ListOrderComponent implements OnInit {
  public name!: string;
  public cpf = "";
  public cpfClient = "";
  public formSearch!: FormGroup;
  public submitted = false;
  public registrations: ProductModel[] = [];

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.listProducts();
  }

  listProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.registrations = data;

        this.registrations.forEach((a) => {
          a.isSelected = false;
        });

        console.log(this.registrations);
      },
      error: (e) => {},
    });
  }

  initForm() {
    this.formSearch = this.formBuilder.group({
      cpfClient: ["", Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formSearch.controls;
  }

  searchClient(cpf: string) {
    if (this.formSearch.invalid) {
      return;
    }

    const { cpfClient } = this.formSearch.value;

    this.clientService.findByCpf(cpfClient).subscribe({
      next: (data: ClientModel) => {
        this.name = data.name + data.sobrenome;
        this.cpf = data.cpf;
      },
      error: (e) => {
        this.errorSave();
      },
    });
  }

  getCheckbox(id: any) {
    console.log(id);

    this.registrations.forEach((a) => {
      if (a.id == id) {
        a.isSelected = !a.isSelected;
      }
    });

    console.log(this.registrations);
  }

  errorSave() {
    this.modalService.open("Cliente não encontrado", {
      ariaLabelledBy: "modal-basic-title",
    });
  }
}
