import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/_services/auth.service';
import { revenueBarChart, statData } from './data';
import { User } from 'src/app/core/models/auth.models';
import { ChartType } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  users:User[];
  revenueBarChart: ChartType;
  statData;
  constructor(private accountService: AuthService) { }

  ngOnInit() {
    this.accountService.getUsers().subscribe((
      users:User[]
    )=>{
      this.users=users;
      console.log(users)
    })

    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];

    // fetches the data
    this._fetchData();
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }
}
