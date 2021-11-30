import { Component, OnInit, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { Profile } from "../../settings/Profile";

import { Router } from "@angular/router";
import { FormBuilder, FormControl, Validators, FormGroup,NgControl } from "@angular/forms";
import { ProductModel } from "../create-product/Product.model";
import { ProductImage } from "../create-product/Product.model";
import { ProductStorageService } from "./Service/product-storage.service";
import { ProductImageService } from "./Service/product-image.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { DOCUMENT } from "@angular/common";
import { Product } from "../product";
import { ProductService } from "../Service/product.service";
declare var M: any;

@Component({
  selector: "app-create-product",
  providers: [ProductService, ProductStorageService, ProductImageService],
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent implements OnInit {
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    defaultFontSize: '5',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      [
      ],
      [
        'insertImage',
        'insertVideo',
      ]
    ]
  };
  editForm:FormGroup;
  constructor(
    private taskService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) {}
  productItem= Product;

  ngOnInit(): void {
    this.editForm =this.formBuilder.group({
      'exhibitor':[this.productItem.exhibitor,[Validators.required]],
       'productName':[this.productItem.productName,[Validators.required]],
      'pickTags':[this.productItem.pickTags,[Validators.required]],
      'location':[this.productItem.location,[Validators.required]],
      'description':[this.productItem.description,[Validators.required]],
     
    })
  }

  createList(
    exhibitor: string,
    productName: string,
    pickTags: string,
    location: string,
    description: string

    // img:File
  ) {
    this.taskService
      .createList(exhibitor, productName, pickTags, location, description)
      .subscribe((list: Product) => {
        console.log(list);
        this.refreshPage();
      });
  }
  refreshPage() {
    this._document.defaultView.location.reload();
  }
}
