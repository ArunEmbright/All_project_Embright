import { Component,Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetService } from '../asset.service';
import { Asset } from '../model/asset.model'
import { Router } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
declare var M: any;

@Component({
  selector: 'app-create-assets',
  templateUrl: './create-assets.component.html',
  styleUrls: ['./create-assets.component.scss']
})
export class CreateAssetsComponent implements OnInit {

  constructor( private taskService: AssetService,private formBuilder:FormBuilder, private router: Router,@Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    
  }
 
  createList(
    exhibitor:string,
    title:string, 
    createType: string,

    // img:File
    ) {
    
    this.taskService.createList( 
      exhibitor,
      title,
      createType,
     
      ).subscribe((list: Asset) => {
      console.log(list);
      this.refreshPage(); 
    });
  }
  refreshPage(){
    this._document.defaultView.location.reload();
  }

}
