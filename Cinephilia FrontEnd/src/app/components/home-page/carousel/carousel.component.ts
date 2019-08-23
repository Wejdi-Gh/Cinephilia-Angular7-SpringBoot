import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  slides : Array<Object> = [ 
    {src: "../../../../assets/images/cover5.jpeg"},
    {src: "../../../../assets/images/cover3.jpeg"},
    {src: "../../../../assets/images/cover4.jpeg"},
    {src: "../../../../assets/images/cover11.jpeg"},
    {src: "../../../../assets/images/cover9.jpeg"},
    {src: "../../../../assets/images/cover2.jpeg"},
    {src: "../../../../assets/images/cover10.jpeg"},
    {src: "../../../../assets/images/cover6.jpeg"},
    {src: "../../../../assets/images/cover1.jpeg"},
    {src: "../../../../assets/images/cover8.jpeg"},
    {src: "../../../../assets/images/cover7.jpeg"},
  ]


  constructor() { }

  ngOnInit() {
  }

}
