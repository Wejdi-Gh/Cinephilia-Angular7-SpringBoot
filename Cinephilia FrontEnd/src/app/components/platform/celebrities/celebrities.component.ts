import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css']
})
export class CelebritiesComponent implements OnInit {

  celebrities: Array<object>;
  constructor(private apiServiceService : ApiServiceService ,private sharedDataServiceService : SharedDataServiceService) { }

  ngOnInit() {
    this. getAllCelebrities()
  }

  getAllCelebrities() {

    this.apiServiceService.getAllCelebrities().subscribe(data=> { 

        this.celebrities =  data[0].results.concat(data[1].results)
    
    }  );
    
    }
    
    nextPage() {
    
    this.apiServiceService.nextPageCelebrities() ;
    this.getAllCelebrities() ;
    window.scrollTo(0, 0)
    
    }
    
    previousPage() {
      this.apiServiceService.previousCelebrities();
      this.getAllCelebrities() ;
      window.scrollTo(0, 0)
    }

}