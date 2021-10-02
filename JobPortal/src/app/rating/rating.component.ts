import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  currentRate = 4.5;
  constructor() { }

  ngOnInit(): void {
  }

  
  rate():void{
    console.log(this.currentRate)
  }

}
