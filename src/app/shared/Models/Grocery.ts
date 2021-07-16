export interface Grocery{
    id?:number;
    measurementType:String;
    name: String;
    expirationDate?: Date;
    quantity: number;
    imageURL: String;
    description: String;
}