

export class UserModel {
 college: string;
 registerNo: string;
 name: string;
 lastName: string;
 email: string;
 contact: string;
 guardianFirstName: string;
 guardianLastName: string;
 guardianEmail: string;
 guardianContact: string;
 department: string;
 year: string;
 paymentMode: string;
 lead_id: string;
 courseId: string;

 location:string


 constructor(college: string,RegisterNo: string,name: string,lastName:string,email: string,contact: string,guardianFirstName:string,guardianEmail:string, department: string,
  year: string, paymentMode: string,guardianContact:  string, lead_id: string, courseId: string,guardianLastName: string,location:string ) {
  this.college = college;
  this.name = name;
  this.lastName = lastName;
  this.registerNo  = RegisterNo;
  this.email =  email;
  this.contact = contact;
  this.guardianFirstName = guardianFirstName;
  this.guardianEmail = guardianEmail;
  this.department = department;

  this.year = year;
  this.paymentMode = paymentMode;
  this.guardianContact = guardianContact;
  this.lead_id = lead_id;
  this.courseId = courseId;
  this.guardianLastName = guardianLastName;
  this.location =location;

   }
}
