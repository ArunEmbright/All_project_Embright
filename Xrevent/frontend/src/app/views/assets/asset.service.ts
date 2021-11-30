
import { Injectable } from '@angular/core';
import { WebRequestService } from '../../Main-Services/WebRequestService';


@Injectable({
  providedIn: 'root'
})
export class AssetService {

  readonly url = 'http://localhost:3000/Asset'
  constructor(private webReqService: WebRequestService) { }

  createList(
    exhibitor:string,
    title:string, 
    createType: string,
    
    
    ) {
    return this.webReqService.post('assets/asset', {
      exhibitor,
      title,
      createType,
     
      
    });
  }
  getLists() {
    return this.webReqService.get('assets/listAsset')
  }
  getSingleAsset(_id:string){
    return this.webReqService.get(`assets/${_id}`)
  }
  updateList(
    id: string, 
    exhibitor:string,
    title:string, 
    createType: string,) {
    return this.webReqService.patch(`assets/listAsset/${id}`, 
    { 
      exhibitor,
      title,
      createType,
      
    });
  }
 
  deleteSingleAsset(_userId:string){
    return this.webReqService.delete(`assets/listAsset/${_userId}`)
  }

}

