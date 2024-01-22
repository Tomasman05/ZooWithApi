import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private bookSub = new Subject()
  url = "http://localhost:7681/api/Animals"
  constructor(private http: HttpClient) {
    this.downloadAnimals()
  }

  getAnimals() {
    return this.bookSub
  }

  downloadAnimals() {
    this.http.get(this.url).subscribe({
      next: (results) => this.bookSub.next(results),
      error: (results) => this.bookSub.next("error")
    })
  }
  addNewAnimal(body: any) {
    this.http.post(this.url, body).forEach(
      () => this.downloadAnimals()
    )
  }
  deleteAnimal(body: any) {
    this.http.delete(this.url + body.id).forEach(
      () => this.downloadAnimals()
    )
  }
  putAnimal(body: any) {
    this.http.put(this.url + body.id, body).forEach(
      () => this.downloadAnimals()
    )
  }
}
