import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';
import { Asset } from '../model/asset.model'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-assets',
  templateUrl: './edit-assets.component.html',
  styleUrls: ['./edit-assets.component.scss']
})
export class EditAssetsComponent implements OnInit {
  editForm:FormGroup;
  constructor(private route: ActivatedRoute, private taskService: AssetService, private router: Router,private formBuilder:FormBuilder) { }
  assetItem= Asset;
  listId: string;
  lists: Asset[];
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.listId = params.listId;
        console.log(params.listId);
        this.taskService.getSingleAsset(this.listId)
        .subscribe((data)=>{
          this.assetItem= JSON.parse(JSON.stringify(data));
          console.log(data);
      })   
      }
    )
    this.editForm =this.formBuilder.group({
      'exhibitor':[this.assetItem.exhibitor,[Validators.required]],
       'title':[this.assetItem.title,[Validators.required]],
      'createType':[this.assetItem.createType,[Validators.required]],
      
      
    })
  
  }

  updateList(
    exhibitor:string,
    title:string, 
    createType: string,
    ){
      this.taskService.updateList(this.listId, 
        exhibitor,
        title,
        createType,
       
        ).subscribe()
      this.router.navigate(['/assets/list-assets'])
    }
}
