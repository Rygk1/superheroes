import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  url = 'http://localhost:3000/marvel/comics';

  constructor(private https: HttpClient) {}

  addFavorite(favorite: any) {
    return this.https.post(`${this.url}/favorites`, favorite);
  }
}
