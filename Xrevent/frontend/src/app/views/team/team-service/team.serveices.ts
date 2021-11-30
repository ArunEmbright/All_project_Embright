
import { Injectable } from '@angular/core';
import { WebRequestService } from '../../../Main-Services/WebRequestService';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  readonly url = 'http://localhost:3000/team'
  constructor(private webReqService: WebRequestService) { }

  createList(
    exhibitor: string,
    firstName:string,
    lastName:string,
    email: string,
    phoneNumber:string,
    designation: string
    
    ) {
    return this.webReqService.post('teams/team', {
      exhibitor,
      firstName,
      lastName,
      email,
      phoneNumber,
      designation
      
    });
  }
  getLists() {
    return this.webReqService.get('teams/listTeam')
  }
  getSingleTeam(_id:string){
    return this.webReqService.get(`teams/${_id}`)
  }
  updateList(
    id: string, 
    exhibitor: string,
    firstName:string,
    lastName:string,
    email: string,
    phoneNumber:string,
    designation: string) {
    return this.webReqService.patch(`teams/listTeam/${id}`, 
    { 
      exhibitor,
      firstName,
      lastName,
      email,
      phoneNumber,
      designation
      
    });
  }
 
  deleteSingleTeam(_userId:string){
    return this.webReqService.delete(`teams/listTeam/${_userId}`)
  }

}
