import { Component, OnInit } from "@angular/core";
import { DoctorService } from "src/app/modules/doctor/doctor.service";
import { TherapistModel } from "src/app/modules/therapist/therapist-list/therapist-model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Therapist } from '../therapist.model';

import { ActivatedRoute, Params, Router } from "@angular/router";
@Component({
  selector: "app-edit-therapist",
  templateUrl: "./edit-therapist.component.html",
  styleUrls: ["./edit-therapist.component.scss"],
})
export class EditTherapistComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private accountService: DoctorService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  users: Therapist[];
  userItem: Therapist;
  id: string;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.userId;
      console.log(params.userId);
      console.log(this.userItem)
      this.accountService.getSingleTherapist(this.id).subscribe((data) => {
        this.userItem = JSON.parse(JSON.stringify(data));
        console.log(data);
        console.log(this.userItem.userId);
      });
    });
    this.editForm = new FormGroup({
      therapistName: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      experience: new FormControl(null, [Validators.required]),
      // patientName: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    this.accountService.updateUser(this.id, this.editForm.value).subscribe(
      (data) => {
        console.log(this.editForm.value);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
