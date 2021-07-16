import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Grocery } from '../shared/Models/Grocery';
import { GroceryService } from '../shared/Services/grocery.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  groceries: Grocery[];
  reduceGrocery: Grocery;

  constructor(private toastr: ToastrService,
    private groceryService: GroceryService,
    private router: Router,
    private route: ActivatedRoute) { }


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
    this.groceryService.getGroceriesByName(this.route.snapshot.params['names']).subscribe(
      data => this.groceries = data,
      err => {
        this.toastr.error("Error ha occurido"),
          console.log(err)
      },
      () => console.log(this.groceries)
    );
  }

}
