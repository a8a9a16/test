import { Component, OnInit } from '@angular/core';
import { PositionsService } from '../data/positions.service'
import { Position } from '../data/position'
import { ActivatedRoute ,Router} from '@angular/router'
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubscription:        any;
  positionSubscription:     any;
  savePositionSubscription: any;
  position:                 Position = new Position; 
  successMessage:           boolean=false; 
  failMessage:              boolean=false;
  constructor(
    private poServ: PositionsService,
    private roServ: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.paramSubscription = this.roServ.params.subscribe(
      id=>{
        this.positionSubscription = this.poServ.getPosition(id['_id']).subscribe(
          position=>{
            this.position = position[0];
          }
        )
      }
    )
  }
  onSubmit(f: NgForm){
    this.savePositionSubscription = this.poServ.savePosition(this.position).subscribe(
      ()=>{
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
        }, 2500);
      },  
      e=>{
        this.failMessage = true;
        setTimeout(() => {
          this.failMessage=false;
        }, 2500);
      }
    )
  }
  routePosition(id: String) {
    this.router.navigate(['/position', id]);
}
  ngOnDestroy(){
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.savePositionSubscription) {
      this.savePositionSubscription.unsubscribe();
    }
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

}
