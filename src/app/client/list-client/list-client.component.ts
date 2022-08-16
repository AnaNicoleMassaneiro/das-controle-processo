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

  onDelete(index: number) {
    this.clientService.delete(index).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(["/list-client"]);
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
}
