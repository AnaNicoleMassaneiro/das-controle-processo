import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientModel } from "src/app/client/models/client.model";
import { ClientService } from "src/app/client/services/client.service";

@Component({
  selector: "list-client",
  templateUrl: "./list-client.component.html",
  styleUrls: ["./list-client.component.scss"],
})
export class ListClientComponent implements OnInit {
  public registrations: ClientModel[] = [];
  public regModel!: ClientModel;
  public showNew: Boolean = false;
  public submitType: string = "Save";
  public selectedRow!: number;
  public client?: ClientModel[];

  constructor(
    private router: Router,
    private clientService: ClientService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.listClients();
  }

  listClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.registrations = data;
      },
      error: (e) => console.error(e),
    });
  }

  onNew() {
    this.regModel = new ClientModel();
    this.submitType = "Save";
    this.showNew = true;
  }

  onEdit(index: number) {
    this.router.navigate(["/registration-client", index]);
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
    this.clientService.delete(index).subscribe({
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
    this.router.navigate(["/registration-client"]);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  viewProductToClient() {
    this.router.navigate(["/client-to-product"]);
  }
}
