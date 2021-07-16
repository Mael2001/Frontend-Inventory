import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Grocery } from '../shared/Models/Grocery';
import { GroceryService } from '../shared/Services/grocery.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private groceryService: GroceryService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  Grocery: Grocery = {
    description: "",
    imageURL: "",
    measurementType: "",

    name: "",
    quantity: 1
  };
  ngOnInit(): void {

    this.groceryService.getGroceriesById(this.route.snapshot.params['id']).subscribe(
      data => this.Grocery = data,
      err => this.toastr.error("Error has ocurred"),
      () => {
        (document.getElementById("nombre") as HTMLInputElement).value = this.Grocery.name.toString();
        (document.getElementById("url") as HTMLInputElement).value = this.Grocery.imageURL.toString();
        (document.getElementById("cantidad") as HTMLInputElement).value = this.Grocery.quantity.toString();
        (document.getElementById("medida") as HTMLInputElement).value = this.Grocery.measurementType.toString();
        (document.getElementById("descripcion") as HTMLInputElement).value = this.Grocery.description.toString();
      }
    );

  }
  enviar(): void {

    var dateControl = (document.querySelector('input[type="date"]') as HTMLInputElement).value;
    var nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    var url = (document.getElementById("url") as HTMLInputElement).value;
    var cantidad = (document.getElementById("cantidad") as HTMLInputElement).value;
    var medida = (document.getElementById("medida") as HTMLInputElement).value;
    var descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;

    console.log("Fecha vencimiento:" + dateControl)
    console.log("Nombre:" + nombre)
    console.log("Url:" + url)
    console.log("Cantidad:" + cantidad)
    console.log("Medida:" + medida)
    console.log("Descripcion:" + descripcion)

    this.Grocery.description = descripcion;
    this.Grocery.expirationDate = new Date(dateControl);
    this.Grocery.imageURL = url;
    this.Grocery.measurementType = medida;
    this.Grocery.name = nombre;
    this.Grocery.quantity = Number(cantidad);

    this.groceryService.editGrocery(this.Grocery).subscribe(
      data => {
        this.toastr.success("Se ha editado exitosamente")
        this.router.navigate(['/home']);
      },
      err => {
        this.toastr.error("Error has ocurred")
        console.log(err)
      },
    )
    console.log(this.Grocery)
  }
}
