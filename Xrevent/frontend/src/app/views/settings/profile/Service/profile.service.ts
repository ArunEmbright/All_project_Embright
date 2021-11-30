import { Injectable } from "@angular/core";
import { WebRequestService } from "../../../../Main-Services/WebRequestService";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private webReqService: WebRequestService) { }


  getUsers(){
    return this.webReqService.get('users/user')
  }
  getSingleUser(_id:string){
    return this.webReqService.get(`users/${_id}`)
  }
updateUser(
  id: string,
  firstName: string,
    lastName: string,
    teamName: string,
    phoneNumber: string,
    location: string,
    address:string,
     email: string, ){
  return this.webReqService.patch(`users/user/${id}`,
  {
    firstName,
    lastName,
    teamName,
    phoneNumber,
    location,
    address,
    email,
  })
}
}
