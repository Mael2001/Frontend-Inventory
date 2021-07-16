import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'home/add', component: NewProductComponent },
  { path: 'home/:id', component: EditProductComponent },
  { path: 'home/search/:names', component: SearchResultComponent },
  { path: '', redirectTo:'home', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
