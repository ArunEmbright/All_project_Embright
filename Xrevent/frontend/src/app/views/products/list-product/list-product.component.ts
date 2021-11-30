import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../Service/product.service';
import { Product } from "../product";
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  lists: Product[];
 i:number=0;
  selectedListId: string;
 
  constructor(private taskService: ProductService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
         
        } 
      }
    )
    this.taskService.getLists().subscribe((lists: Product[]) => {
      this.lists = lists;
    })
    
  }

  deleteProductFn(item:Product){
    if(confirm("Are you sure you want to delete")){
    for(this.i=0;this.i<this.lists.length;this.i++){
      if(item._id==this.lists[this.i]._id){
        this.lists.splice(this.i,1);
        console.log("success")
      }
    }
    this.taskService.deleteSingleProduct(item._id).subscribe(()=>{
    })
    console.log("big success")
    this.router.navigate(['/products/list-product']);
    
  }
  else{
    this.router.navigate(['/product/list-products']);
    console.log("failed");
  }
  }
  

  
}
