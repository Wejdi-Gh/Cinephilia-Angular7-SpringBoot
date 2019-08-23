import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Array<object> ;

  constructor( private apiServiceService : ApiServiceService ,private sharedDataServiceService : SharedDataServiceService) { }

  ngOnInit() {
    this.getAllMovies () ;
  }

  
getAllMovies () {

this.apiServiceService.getAllMovies().subscribe(data=> { 
    
    this.movies =  data[0].results.concat(data[1].results)


}  );

}

nextPage() {

this.apiServiceService.nextPage() ;
this.getAllMovies () ;
window.scrollTo(0, 0)

}

previousPage() {
  this.apiServiceService.previousPage();
  this.getAllMovies () ;
  window.scrollTo(0, 0)
}




}

