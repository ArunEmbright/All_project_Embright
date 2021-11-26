import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "../../auth/_services/auth.service";
import { User } from "src/app/core/models/auth.models";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import jsPDF from "jspdf";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake";
@Component({
  selector: "app-patientresult",
  templateUrl: "./patientresult.component.html",
  styleUrls: ["./patientresult.component.scss"],
})
export class PatientresultComponent implements OnInit {
  elements = ["block", "text", "form", "table"];

  data: any;
  score: number;
  AutismState: any;
  patientName: string;
  age: Number;
  userId: string;
  users: User[];


  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getList().subscribe((data) => {
      console.log(data);
      this.score = data[0].sum;
      this.patientName = data[0].patientName;
      this.age = data[0].age;
      this.userId = data[0].userId;
      this.AutismState = data[0].degreeOfAutism;
    });
  }

  public downloadAsPDF() {
    const doc = new jsPDF();



    var html = htmlToPdfmake(`
    <h2>ISSA SCORE</h2>
    <table width="400" border="0" cellpadding="0" cellspacing="0">
    <tr>
    <td style="height:40px; width:40px; margin:0;">Name</td>
    <td>${this.patientName}</td>
    
  </tr>
  <tr>
  <td>Age</td>
  <td>${this.age}</td>
  
</tr>
  <tr>
  <td>score</td>
  <td>${this.score}</td>
    
  </tr>
  <td>State of Autism</td>
  <td>${this.AutismState}</td>
    
  </tr>
    </table>
    `);

    const documentDefinition = { content: html };

    pdfMake.createPdf(documentDefinition).open();
  }

  onBtnAddElement(el: string): void {
    this.elements = [...this.elements, el];
  }
}
