import { UserModel } from "./user.model";
import { CourseDetailsModel } from "./course_details.model";


export class PaymentDetailsModel {
  meta_data: string;
  userName: string;
  password: string;
  course_details: CourseDetailsModel;
  UserModel: UserModel;
  notes: string;




 constructor(meta_data: string,userName: string,password: string,course_details: CourseDetailsModel,applicant_details: UserModel,notes: string ) {
  this.meta_data = meta_data;
  this.userName  = userName;
  this.password  = password;
  this.course_details =  course_details;
  this.UserModel = applicant_details;
  this.notes = notes;




   }
}
