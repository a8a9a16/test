import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeesService } from "../data/employees.service";
import { ActivatedRoute } from "@angular/router"
import { PositionsService } from "../data/positions.service"
import { Position } from "../data/position"
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  paramSubscription:        any;
  employeeSubscription:     any;
  getPositionsSubcription:  any;
  saveEmployeeSubscription: any;
  employee:                 EmployeeRaw= new EmployeeRaw;
  positions:                Position[];
  successMessage:           boolean=false;
  failMessage:              boolean=false;
  constructor(
    private EmployeeService : EmployeesService,
    private ActivatedRoute : ActivatedRoute,
    private PositionService : PositionsService
  ) { }

  ngOnInit() {
    this.paramSubscription = this.ActivatedRoute.params.subscribe(
      (id) =>{
        this.employeeSubscription = this.EmployeeService.getEmployee(id['_id']).subscribe(
          employee=>{
            this.employee = employee[0];
          }
        )
      }
    );
    this.getPositionsSubcription = this.PositionService.getPositions().subscribe(
      (position)=>{
        this.positions = position;
      }
    )    
  }

  onSubmit(){
    this.saveEmployeeSubscription = this.EmployeeService.saveEmployee(this.employee).subscribe(
      (e1)=>{
        this.successMessage = true;
        setTimeout(()=>{this.successMessage = false},2500);
      },error=>{
        this.failMessage=true;
        console.log(error);
        setTimeout(()=>{this.failMessage = false},2500);
      }    
    )
  }
  ngOnDestroy(){
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
    if (this.saveEmployeeSubscription) {
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}
