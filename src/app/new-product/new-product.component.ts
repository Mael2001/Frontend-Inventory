import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Grocery } from '../shared/Models/Grocery';
import { GroceryService } from '../shared/Services/grocery.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private groceryService: GroceryService,
    private router: Router){

  }

  Grocery: Grocery = {
    description:"",
    imageURL:"",
    measurementType:"",
    name:"",
    quantity:1
  };
  ngOnInit(): void {
  }
  retornar():void{
    this.router.navigate(['/home']);
  }
  enviar(): void {

    var dateControl = (document.querySelector('input[type="date"]')as HTMLInputElement).value;
    var nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    var url = (document.getElementById("url") as HTMLInputElement).value;
    var cantidad = (document.getElementById("cantidad") as HTMLInputElement).value;
    var medida = (document.getElementById("medida") as HTMLInputElement).value;
    var descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;

    console.log("Fecha vencimiento:"+ dateControl)
    console.log("Nombre:"+ nombre)
    console.log("Url:"+ url)
    console.log("Cantidad:"+ cantidad)
    console.log("Medida:"+ medida)
    console.log("Descripcion:"+ descripcion)

    this.Grocery.description=descripcion;
    this.Grocery.expirationDate=new Date(dateControl);
    this.Grocery.imageURL=url;
    this.Grocery.measurementType=medida;
    this.Grocery.name=nombre;
    this.Grocery.quantity=Number(cantidad);

    this.groceryService.addGrocery(this.Grocery).subscribe(
      data => {
        this.toastr.success("Se ha agregado exitosamente")
        this.router.navigate(['/home']);
      },
      err => {
        this.toastr.error("Error has ocurred"),
        console.log(err)
      })
    console.log(this.Grocery)
  }
}
