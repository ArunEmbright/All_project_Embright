import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { CourseDetailsModel } from 'src/app/model/course_details.model';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
declare var jQuery: any;

const backURL = `${environment.apiURL}`;
const emiURL = `${environment.BaseUrl}`;
const razopay = `${environment.razorPay}`;
declare var $: any;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  state$ = new BehaviorSubject<any>(null);
  _user: any;
  data: any;
  _data: any;
  list: any;
  courseData: any;
  constructor(private http: HttpClient, private router: Router) {
    this._user = JSON.parse(
      sessionStorage.getItem('applicant_details') || '{}'
    );
    console.log(this._user.name);
  }

  postUser(params: any,collegeName:string,courseName:string,locationName:string) {
    this.list={
     
      name:params.name,
      lastName:params.lastName,
      email:params.email,
      phone:params.phone,
      collegeName:collegeName,
      register_no:params.register_no,
      father_name:params.father_name,
      father_last:params.father_last,
      father_email:params.father_email,
      father_phone:params.father_phone,
      courseName:courseName,
      year:params.year,
      paymentMode:params.paymentMode,
      location:locationName
      
    
    
    
      
      
    }
    return this.http.post<any>(`${backURL}/auth/register`, this.list).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getUser() {
    return this.http.get(`${backURL}/auth/userList`);
  }
  getPayment() {
    return this.http.get(`${backURL}/pay/users`);
  }

  postEMI(formData: any) {
    this.http.post<any>(`${emiURL}/register/emi/update`, formData).subscribe(
      (res: any) => {
        console.log('From server', res);
      },
      (err: any) => console.log(err)
    );
  }
  confirmation(_data: any) {
    this.list={"email": _data.email}
    console.log(this.list)
    this.http.post<any>(`${backURL}/auth/confirmation`, this.list).subscribe(
      (res:any) => {
        console.log('From server', res);
      }, (err:any) => console.log(err)
    )
  }
  submitPayment(data: any, rate: number) {
    this.list = {
      meta_data: 'ASWE12345',
      userName: 'UATEthnotech',
      password: '4447f915b68e17a3338049a64220e08e',
      course_details: {
        client_institute_id: data.college_id,
        client_course_id: data.course_id,
        client_location_id: data.location_id,
        loan_amount: rate ,
      },
      applicant_details: {
        first_name: data.first_name,
        last_name: data.last_name,
        mobile: data.mobile,
        email: data.email,
      },
    };
    this.http
      .post<any>(
        'https://id-staging.eduvanz.com/api/instantdecision/createQuickLead',
        this.list
      )
      .subscribe((res: any) => {});
    setTimeout(() => {
      $('.close').click();
      window.location.href ='#/emiSuccess'
    }, 300);
  }
  //***********ADD COLLEGE**********/
  postCollege(params: any) {
    console.log('err');
    return this.http.post<any>(`${backURL}/college/addCollege`, params).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getCollege() {
    return this.http.get(`${backURL}/college/getList`);
  }

  // getOrderID(params:any){
  //   return this.http.post<any>(`https://api.razorpay.com/v1/checkout/embedded`,params).pipe(
  //     map((res)=>{
  //       console.log(res)
  //       return res;
  //     })
  //   )
  // }
  createOrder(params: any, data: any, _data: any): Observable<any> {
    console.log(data.email)
    this.list = {
      payment_id: params.razorpay_payment_id,
      firstName: data.first_name,
      email: data.email,
      amount: _data,
    };
    return this.http.post(`${backURL}/pay/payment`, this.list).pipe(
      map((res) => {
        // login successful if there's a jwt token in the response
        return res;
      })
    );
  }
  setData(payment: any) {
    console.log(payment);
  }
}
