import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import {ProductService } from '../Service/product.service';
@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {
  editForm:FormGroup;
  constructor(private route: ActivatedRoute, private taskService: ProductService, private router: Router,private formBuilder:FormBuilder) { }
  productItem= Product;
  listId: string;
  lists: Product[];
 description=""
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.listId = params.listId;
        console.log(params.listId);
        this.taskService.getSingleProduct(this.listId)
        .subscribe((data)=>{
          this.productItem= JSON.parse(JSON.stringify(data));
          console.log(data);
      })   
      }
    )
    this.editForm =this.formBuilder.group({
      'exhibitor':[this.productItem.exhibitor,[Validators.required]],
       'productName':[this.productItem.productName,[Validators.required]],
      'pickTags':[this.productItem.pickTags,[Validators.required]],
      'location':[this.productItem.location,[Validators.required]],
      'description':[this.productItem.description,[Validators.required]],
     
    })
  
  }

  updateList(
    exhibitor:string,
    productName:string, 
    pickTags: string,
  location: string,
  description: string,
  ){
      this.taskService.updateList(this.listId, 
        exhibitor,
      productName,
      pickTags,
      location,
      description
      ).subscribe()
      this.router.navigate(['/products/list-product'])
    }

}
