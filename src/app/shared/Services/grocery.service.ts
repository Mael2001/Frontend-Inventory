import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grocery } from '../Models/Grocery';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  private url = '/api/'

  constructor(private http: HttpClient) { }

  getGroceries(): Observable<Grocery[]> {
    return this.http.get<Grocery[]>(this.url);
  }
  getGroceriesById(id): Observable<Grocery> {
    return this.http.get<Grocery>(this.url + "/" + id);
  }
  getGroceriesByName(Name: String): Observable<Grocery[]> {
    return this.http.get<Grocery[]>(this.url + "/filter/" + Name);
  }
  addGrocery(Grocery: Grocery): Observable<Grocery> {
    let hdrs = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.post<Grocery>(this.url, Grocery, hdrs);
  }
  reduceAmountGrocery(Grocery: Grocery): Observable<Grocery> {
    let hdrs = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.post<Grocery>(this.url + "/reduce", Grocery, hdrs);
  }
  editGrocery(Grocery: Grocery): Observable<Grocery> {
    let hdrs = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    console.log(this.url)
    return this.http.post<Grocery>(this.url+"/edit", Grocery, hdrs);
  }
  deleteGroceries(id: number): Observable<Grocery> {
    return this.http.delete<Grocery>(this.url + "/" + id);
  }
}
