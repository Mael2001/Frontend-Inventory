import { Component, OnInit } from '@angular/core';
import { Grocery } from '../shared/Models/Grocery';
import { ToastrService } from 'ngx-toastr';
import { GroceryService } from '../shared/Services/grocery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  /*
  groceries: Grocery[] = [{
    expirationDate: new Date(),
    imageURL: "https://images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg",
    name: "Comida 1 ",
    quantity: 20,
    description: "Description",
    id: 1,
    measurementType: "lb"
  },
  {
    expirationDate: new Date(),
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1920px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    name: "Comida 2 ",
    quantity: 30,
    description: "Description",
    id: 1,
    measurementType: "lb"
  },
  {
    expirationDate: new Date(),
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1920px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    name: "Comida 3 ",
    quantity: 40,
    description: "Description",
    id: 1,
    measurementType: "lb"
  },
  {
    expirationDate: new Date(),
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1920px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    name: "Comida 4 ",
    quantity: 20,
    description: "Description",
    id: 1,
    measurementType: "lb"
  },
  {
    expirationDate: new Date(),
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1920px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
    name: "Comida 5 ",
    quantity: 60,
    description: "Description",
    id: 1,
    measurementType: "lb"
  }]*/

  groceries: Grocery[];
  reduceGrocery: Grocery;

  constructor(private toastr: ToastrService,
    private groceryService: GroceryService,
    private router: Router) { }


  reducir(): void {
    var cantidad = (document.getElementById("cantidad") as HTMLInputElement).value;
    if (Math.abs(Number(cantidad)) >= this.reduceGrocery.quantity) {
      this.groceryService.deleteGroceries(this.reduceGrocery.id).subscribe(
        data => this.toastr.success("Se ha borrado exitosatemente"),
        err => {
          this.toastr.error("Error ha occurido"),
            console.log(err)
        })
    }
    else
      this.reduceGrocery.quantity = this.reduceGrocery.quantity - Math.abs(Number(cantidad))

    this.groceryService.reduceAmountGrocery(this.reduceGrocery).subscribe(
      data => this.toastr.success("Se ha reducido exitosatemente"),
      err => {
        this.toastr.error("Error ha occurido"),
          console.log(err)
      })
  }
  asignarGrocery(grocery): void {
    this.reduceGrocery = grocery
  }
  agregar(): void {
    this.router.navigate(['/home/add']);
  }
  editar(id): void {
    this.router.navigate(['/home/' + id]);
  }
  eliminar(grocery): void {
    this.groceryService.deleteGroceries(grocery.id).subscribe(
      data => this.toastr.success("Se ha borrado exitosamente"),
      err => {
        this.toastr.error("Error ha occurido"),
          console.log(err)
      })
  }

  ngOnInit(): void {
    this.groceryService.getGroceries().subscribe(
      data => this.groceries = data,
      err => {
        this.toastr.error("Error ha occurido"),
          console.log(err)
      },
      () => console.log(this.groceries)
    );
  }

}
