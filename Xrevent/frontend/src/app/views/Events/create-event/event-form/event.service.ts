import { WebRequestService } from "../../../../Main-Services/WebRequestService";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EventService {
  readonly url = "http://localhost:3000/eventperson";
  constructor(private webReqService: WebRequestService) {}

  createList(
    exhibitor: string,
    organizer: string,
    eventName: string,
    startDate: string,
    endDate: string,
    location: string
  ) {
    return this.webReqService.post("events/event", {
      exhibitor,
      organizer,
      eventName,
      startDate,
      endDate,
      location,
    });
  }
  getLists() {
    return this.webReqService.get("events/listEvent");
  }
  getSingleEvent(_id: string) {
    return this.webReqService.get(`events/${_id}`);
  }
  updateList(
    id: string,
    exhibitor: string,
    organizer: string,
    eventName: string,
    startDate: string,
    endDate: string,
    location: string
  ) {
    return this.webReqService.patch(`events/listEvent/${id}`, {
      exhibitor,
      organizer,
      eventName,
      startDate,
      endDate,
      location,
    });
  }

  deleteSingleEvent(_userId: string) {
    return this.webReqService.delete(`events/listEvent/${_userId}`);
  }
}
