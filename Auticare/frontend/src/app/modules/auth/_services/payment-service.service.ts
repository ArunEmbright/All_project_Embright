import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

function _window():any{
  return window;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  declare var Razorpay: any;

  const backURL = `${environment.apiURL}`
@Injectable({
  providedIn: 'root'
})
export class PaymentService{

  constructor(private http:HttpClient) { }

  get nativeWindow():any{
    return _window();
  }

 createOrder(order): Observable<any>{
  return this.http.post(`${backURL}/pay/payment`,{
    amount:order.amount,
    
    
  },httpOptions)
 }
}
