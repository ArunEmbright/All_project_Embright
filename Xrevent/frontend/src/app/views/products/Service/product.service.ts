import { Injectable } from "@angular/core";
import { WebRequestService } from "../../../Main-Services/WebRequestService";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  readonly url = "http://localhost:3000/Product";
  constructor(private webReqService: WebRequestService) {}

  createList(
    exhibitor: string,
    productName: string,
    pickTags: string,
    location: string,
    description: string
  ) {
    return this.webReqService.post("products/product", {
      exhibitor,
      productName,
      pickTags,
      location,
      description,
    });
  }
  getLists() {
    return this.webReqService.get("products/listProduct");
  }
  getSingleProduct(_id: string) {
    return this.webReqService.get(`products/${_id}`);
  }
  updateList(
    id: string,
    exhibitor: string,
    productName: string,
    pickTags: string,
    location: string,
    description: string
  ) {
    return this.webReqService.patch(`products/listProduct/${id}`, {
      exhibitor,
      productName,
      pickTags,
      location,
      //description,
    });
  }

  deleteSingleProduct(_userId: string) {
    return this.webReqService.delete(`products/listProduct/${_userId}`);
  }
}
