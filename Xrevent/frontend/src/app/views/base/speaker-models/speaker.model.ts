export class Speaker {
 
    _id: string;
    title: string;
    firstName: string;
    phoneNumber: string;
    company: string;
    designation:string;
    img :string;
  static title: any;
  static firstName: any;
  static phoneNumber: any;
  static company: any;
  static designation: any;
    
    
}

export interface SpeakerImage {
  _id:string,
    imagePath:string
}

