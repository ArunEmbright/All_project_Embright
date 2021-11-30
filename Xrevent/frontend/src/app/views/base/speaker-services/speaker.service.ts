import { Injectable } from "@angular/core";
import { WebRequestService } from "../../../Main-Services/WebRequestService";

@Injectable({
  providedIn: 'any'
})

export class SpeakerService {

  constructor(private webReqService: WebRequestService) { }

   createList(title: string, firstName: string,
    phoneNumber: string,
    company: string,
    designation: string,
    // img:File,
    
    ) {
    return this.webReqService.post('speakers/speaker', {
      title,
      firstName,
      phoneNumber,
      company,
      designation,
      // img
    }); 
  }
  getLists() {
    return this.webReqService.get('speakers/listSpeaker')
  }
  getSingleSpeaker(_id:string){
    return this.webReqService.get(`speakers/${_id}`)
  }
  updateList(
    id: string, 
    title: string, 
    firstName: string,
    phoneNumber: string,
    company: string,
    designation: string,) {
    return this.webReqService.patch(`speakers/listSpeaker/${id}`, 
    { 
      title ,
      firstName,
      phoneNumber,
      company,
      designation
      
    });
  }
 
  deleteSingleSpeaker(_userId:string){
    return this.webReqService.delete(`speakers/listSpeaker/${_userId}`)
  }
}