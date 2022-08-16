import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClientModel } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";

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

  constructor(private router: Router, private clientService: ClientService) {}

  ngOnInit() {
    console.log("");
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
    this.selectedRow = index;
    this.regModel = new ClientModel();
    this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
    this.submitType = "Update";
    this.showNew = true;
  }

  onDelete(index: number) {
    this.registrations.splice(index, 1);
  }

  onCancel() {
    this.showNew = false;
  }

  callModal() {
    this.router.navigate(["/registration-client"]);
  }
}
