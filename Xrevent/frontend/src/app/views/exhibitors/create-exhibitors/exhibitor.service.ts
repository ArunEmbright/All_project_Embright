
import { Injectable } from '@angular/core';
import { WebRequestService } from '../../../Main-Services/WebRequestService';


@Injectable({
  providedIn: 'root'
})
export class ExhibitorService {

  readonly url = 'http://localhost:3000/exhibitor'
  constructor(private webReqService: WebRequestService) { }

  createList(
    events:string,
    firstName:string, 
    lastName: string,
    startDate: string,
    endDate:string,
    exhibitorTags:string,
    companyName: string,
    email: string,
    phoneNumber:number
    
    ) {
    return this.webReqService.post('exhibitors/exhibitor', {
      events,
      firstName,
      lastName,
      startDate,
      endDate,
      exhibitorTags,
      companyName,
      email,
      phoneNumber,
      
    });
  }
  getLists() {
    return this.webReqService.get('exhibitors/listExhibitor')
  }
  getSingleExhibitor(_id:string){
    return this.webReqService.get(`exhibitors/${_id}`)
  }
  updateList(
    id: string, 
    events:string,
    firstName:string, 
    lastName: string,
    startDate: string,
    endDate:string,
    exhibitorTags:string,
    companyName: string,
    email: string,
    phoneNumber:number) {
    return this.webReqService.patch(`exhibitors/listExhibitor/${id}`, 
    { 
      events,
      firstName,
      lastName,
      startDate,
      endDate,
      exhibitorTags,
      companyName,
      email,
      phoneNumber,
      
    });
  }
 
  deleteSingleExhibitor(_userId:string){
    return this.webReqService.delete(`exhibitors/listExhibitor/${_userId}`)
  }

}
