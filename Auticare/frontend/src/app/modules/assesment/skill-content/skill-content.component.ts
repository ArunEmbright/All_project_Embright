import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {AdminService} from '../../admin/admin.service';
import {Activity} from '../../admin/Skill-training-pack/activity.model'
@Component({
  selector: 'app-skill-content',
  templateUrl: './skill-content.component.html',
  styleUrls: ['./skill-content.component.scss']
})
export class SkillContentComponent implements OnInit {
  activities:Activity[];
  title: string;
  activity:any[]=[]
  state$: Observable<object>;
  currentPlayingVideo: HTMLVideoElement;
  constructor(public activatedRoute: ActivatedRoute,private accountService: AdminService) { }
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  ngOnInit(): void {
   
    const searchStr = window.history.state.skill
    this.accountService.getActivity().subscribe((
      activities:Activity[]
    )=>{
      this.activities=activities.filter(
        (doctor)=>{
          return doctor.skillArea.toLowerCase().search(
            searchStr.toLowerCase())!==-1;
          });
 this.title = window.history.state.skill
     console.table(this.activities)
    })
  }
//  filterContent(){
//   const searchStr = "Speech & Language"
//    this.activities = this.activities.filter(
//     (doctor)=>{
//       return doctor.skillArea.toLowerCase().search(
//         searchStr.toLowerCase())!==-1;
//       })

//  }
onPlayingVideo(event) {
  event.preventDefault();
  // play the first video that is chosen by the user
  if (this.currentPlayingVideo === undefined) {
      this.currentPlayingVideo = event.target;
      this.currentPlayingVideo.play();
  } else {
  // if the user plays a new video, pause the last one and play the new one
      if (event.target !== this.currentPlayingVideo) {
          this.currentPlayingVideo.pause();
          this.currentPlayingVideo = event.target;
          this.currentPlayingVideo.play();
      }
  }
}
 
}
