import { Component, OnInit } from "@angular/core";
import { User } from "src/app/core/models/auth.models";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AdminService } from "../../admin.service";
@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private admin: AdminService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  users: User[];
  userItem: User;
  id: string;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.userId;
      console.log(params.userId);
      this.admin.getSingleUser(this.id).subscribe((data) => {
        this.userItem = JSON.parse(JSON.stringify(data));
        console.log(data);
        console.log(this.userItem.userId);
        console.log(this.userItem)
      });
    });
    this.editForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      mobileNumber: new FormControl(null, [Validators.required]),
      patientName: new FormControl(null, [Validators.required]),
    });
  }

  updateUser() {}
  onSubmit() {
    this.admin.updateUser(this.id, this.editForm.value).subscribe(
      (data) => {
        console.log(this.editForm.value);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngAfterViewInit() {
    setTimeout(() => {
      console.clear();
    }, 200);
  }
}
