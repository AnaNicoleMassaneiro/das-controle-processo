import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientModel } from "src/app/client/models/client.model";
import { ClientService } from "src/app/client/services/client.service";
import { ProductModel } from "src/app/product/models/product.model";
import { ProductService } from "src/app/product/services/product.service";
import { Order } from "../../models/order.model";
import { OrderService } from "../../services/order.service";
import { Router } from "@angular/router";

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
  public idClient!: number;
  public closeResult = "";

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private modalService: NgbModal,
    public orderService: OrderService,
    private router: Router
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
        this.idClient = data.id;
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
  }

  errorSave() {
    this.modalService.open("Cliente não encontrado", {
      ariaLabelledBy: "modal-basic-title",
    });
  }

  sendListOrder(content: any) {
    this.submitted = true;
    let env: Order[] = [];

    if (this.formSearch.invalid) {
      return;
    }

    this.registrations.forEach((element) => {
      if (element.isSelected) {
        const teste = document.getElementById(element.id)?.ATTRIBUTE_NODE;

        const data: Order = {
          idClient: this.idClient,
          qtd: teste,
          idProduct: element.id,
        };

        env.push(data);
      }
    });

    this.orderService.create(env).subscribe({
      next: (res) => {
        this.sucessSave(content);
      },
      error: (e) => {
        this.errorSave();
        console.error(e);
      },
    });
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

    this.router.navigate(["/list-order"]);
  }
}
