import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-book-therapist",
  templateUrl: "./book-therapist.component.html",
  styleUrls: ["./book-therapist.component.scss"],
})
export class BookTherapistComponent implements OnInit {
  submitted = false;
  addTherapist: FormGroup;
  relationship: any = ["Father", "Mother", "Siblings"];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addTherapist = this.formBuilder.group({
      id: ["", [Validators.required, ]],
      name: ["", [Validators.required, Validators.name]],
      designation: ["", [Validators.required, ]],
      specialization: ["", [Validators.required, ]],
      experience: ["", [Validators.required, ]],
      certificate: ["", [Validators.required, ]],
      mobileNumber: ["", [Validators.required, ]],
      email: ["", [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.addTherapist.controls;
  }

  changeRelation(e) {
    console.log(e.target.value);
  }
  onSubmit() {}
}
