import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  series: Array<object>;
  constructor(private apiServiceService : ApiServiceService ,private sharedDataServiceService : SharedDataServiceService) { }

  ngOnInit() {
    this. getAllSeries()
  }

  getAllSeries() {

    this.apiServiceService.getAllSeries().subscribe(data=> { 

        this.series =  data[0].results.concat(data[1].results)
    
    }  );
    
    }
    
    nextPage() {
    
    this.apiServiceService.nextPageSerise() ;
    this.getAllSeries() ;
    window.scrollTo(0, 0)
    
    }
    
    previousPage() {
      this.apiServiceService.previousPageSerise();
      this.getAllSeries() ;
      window.scrollTo(0, 0)
    }

}

