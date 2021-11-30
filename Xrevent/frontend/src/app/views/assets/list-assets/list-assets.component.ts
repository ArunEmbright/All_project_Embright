import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AssetService } from '../asset.service';
import { Asset } from '../model/asset.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-list-assets',
  templateUrl: './list-assets.component.html',
  styleUrls: ['./list-assets.component.scss']
})
export class ListAssetsComponent implements OnInit {

  lists: Asset[];
 i:number=0;
  selectedListId: string;

  constructor(private taskService: AssetService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
         
        } 
      }
    )
    this.taskService.getLists().subscribe((lists: Asset[]) => {
      this.lists = lists;
    })
    
  }

  deleteAssetFn(item:Asset){
    if(confirm("Are you sure you want to delete")){
    for(this.i=0;this.i<this.lists.length;this.i++){
      if(item._id==this.lists[this.i]._id){
        this.lists.splice(this.i,1);
        console.log("success")
      }
    }
    this.taskService.deleteSingleAsset(item._id).subscribe(()=>{
    })
    console.log("big success")
    this.router.navigate(['/assets/list-assets']);
    
  }
  else{
    this.router.navigate(['/assets/list-assets']);
    console.log("failed");
  }
  }
  

}
