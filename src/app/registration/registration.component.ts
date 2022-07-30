import { Component, OnInit } from "@angular/core";
import { Registration } from '../models/registration';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
    public registrations: Registration[] = [];
    public regModel!: Registration;
    public showNew: Boolean = false;
    public submitType: string = "Save";
    public selectedRow!: number;
  constructor() {
      this.registrations.push(
      new Registration(
        "Ana",
        "Nicole",
        "123123123",
      )
    );

    this.registrations.push(
      new Registration(
        "Gio",
        "Barreto",
        "123123123",
      )
    );

    this.registrations.push(
      new Registration(
        "Maria",
        "Joana",
        "123123123",
      )
    );
  }

  
onNew() {
  this.regModel = new Registration();
  this.submitType = 'Save';
  this.showNew = true;
  }

onSave() {
  if (this.submitType === 'Save') {
    this.registrations.push(this.regModel);
  } else {
  
  // Update existing 
  
  this.registrations[this.selectedRow].firstName = this.regModel.firstName;  
  this.registrations[this.selectedRow].lastName = this.regModel.lastName;  
  this.registrations[this.selectedRow].cpf = this.regModel.cpf; 
}
  
  this.showNew = false;
  
}

onEdit(index: number) {
  this.selectedRow = index;
  this.regModel = new Registration();
  // Retrieve selected 
  this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
  this.submitType = 'Update';
  this.showNew = true;
  
}

onDelete(index: number) {
  this.registrations.splice(index, 1);
}

onCancel() {
  this.showNew = false;
}

  ngOnInit() {}
}


