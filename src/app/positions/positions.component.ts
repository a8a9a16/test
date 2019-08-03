import { Component, OnInit } from '@angular/core';
import { Position } from "../data/position";
import { PositionsService } from '../data/positions.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-position',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positions:          Position[];
  getPositionsSub:    any;
  loadingError:       boolean=false;
  
  constructor(
    private PositionsService:PositionsService,
    private router:Router
  ) { }
  routePosition(id: string){
    this.router.navigate(["/position", id]);
  }
  ngOnInit() {
    this.getPositionsSub = this.PositionsService.getPositions().subscribe(
      positions => this.positions = positions,
      
      e=>{
        this.loadingError=true;
      }
    );
  }
  ngOnDestroy(){
    if(this.getPositionsSub){
      this.getPositionsSub.unsubscribe();
}
  }
}
