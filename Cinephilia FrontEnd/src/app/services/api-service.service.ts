import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {



movieListNumber : number=1;
seriesListNumber : number=1;
celebritiesListNumber : number=1;
  constructor(private http: HttpClient ) { }



getAllMovies () : Observable<any[]> {
  let response1 = this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=4ace3fe68ae5a10120b01abb692f8b4a&language=en-US&page=${this.movieListNumber}`);
  let response2 = this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=4ace3fe68ae5a10120b01abb692f8b4a&language=en-US&page=${this.movieListNumber +1}`);

return  forkJoin([response1, response2]);

}

nextPage() {

  this.movieListNumber ++
console.log(this.movieListNumber)
}

previousPage() {
if (this.movieListNumber>1) {
  this.movieListNumber --
}
}
 
getAllSeries () : Observable<any[]> {
  let response1 = this.http.get(`https://api.themoviedb.org/3/tv/popular?api_key=4ace3fe68ae5a10120b01abb692f8b4a&language=en-US&page=${this.seriesListNumber}`);
  let response2 = this.http.get(`https://api.themoviedb.org/3/tv/popular?api_key=4ace3fe68ae5a10120b01abb692f8b4a&language=en-US&page=${this.seriesListNumber +1}`);

return  forkJoin([response1, response2]);

}

nextPageSerise() {

  this.seriesListNumber ++
console.log(this.seriesListNumber)
}

previousPageSerise() {
if (this.seriesListNumber>1) {
  this.seriesListNumber --
}
}

getAllCelebrities () : Observable<any[]> {
  let response1 = this.http.get(`https://api.themoviedb.org/3/person/popular?api_key=4ace3fe68ae5a10120b01abb692f8b4a&language=en-US&page=${this.celebritiesListNumber}`);
  let response2 = this.http.get(`https://api.themoviedb.org/3/person/popular?api_key=4ace3fe68ae5a10120b01abb692f8b4a&language=en-US&page=${this.celebritiesListNumber +1}`);

return  forkJoin([response1, response2]);

}


nextPageCelebrities() {

  this.celebritiesListNumber ++
console.log(this.celebritiesListNumber)
}

previousCelebrities() {
if (this.celebritiesListNumber>1) {
  this.celebritiesListNumber --
}
}


}
