import { Component, OnInit } from '@angular/core';
import {Activity} from '../activity.model'
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AdminService } from "../../admin.service";
@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.scss']
})
export class EditActivityComponent implements OnInit {
  activities:Activity[];
  activity:any[]=[]
  editForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private admin: AdminService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  userItem: Activity;
  id: string;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.userId;
      console.log(params.userId);
      this.admin.getSingleActivity(this.id).subscribe((data) => {
        this.userItem = JSON.parse(JSON.stringify(data));
        console.log(data);
        console.log(this.userItem.activityId);
        console.log(this.userItem)
      });
    });
    this.editForm = new FormGroup({
      activityName: new FormControl(null, [Validators.required]),
      skillArea: new FormControl(null, [Validators.required]),
      typeOfAutism: new FormControl(null, [Validators.required]),
   
    });
  }
  onSubmit() {
    this.admin.updateActivity(this.id, this.editForm.value).subscribe(
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
