export class CourseDetailsModel {
    client_institute_id: string;
    client_course_id: string;
    client_location_id: string;
    loan_amount: string;
   
   
   
    constructor(client_institute_id: string,client_course_id: string,client_location_id: string,loan_amount: string) {
     this.client_institute_id = client_institute_id;
     this.client_course_id  = client_course_id;
     this.client_location_id  = client_location_id;
     this.loan_amount = loan_amount;
   
   
   
      }
   }