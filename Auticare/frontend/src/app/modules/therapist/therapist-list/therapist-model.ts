export class TherapistModel{
    userId:string
    id:number;
    category:string;
    location:string;
    therapistName:string;
    experience:number;
    image:string;
}

export class FilterObject {
    experience:number[];
    maxExp:number;
    minExp:number;
}