import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "../data/employees.service";
import { Employee } from "../data/employee";
import { Router } from '@angular/router'
@Component({
  selector: 'app-employee',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {


  employees:        Employee[];
  getEmployeesSub:  any;
  loadingError:     boolean=false; 
  filteredEmployees: Employee[];
  constructor(
    private EmployeesService : EmployeesService,
    private router:Router
  ) { }
  routeEmployee(id: string) {
    this.router.navigate(["/employee", id]);
  }

  ngOnInit() {
    this.getEmployeesSub = this.EmployeesService.getEmployees().subscribe(
      employees =>{
        this.employees = employees;

        this.filteredEmployees = employees;
      } ,
      
      e=>{
          this.loadingError=true;
        }
      
    );

  }
  ngOnDestroy(){
    if(this.getEmployeesSub){
      this.getEmployeesSub.unsubscribe();
    }
  }
onEmployeeSearchKeyUP(event:any) {
    this.filteredEmployees = this.employees.filter((employee) => {
      return employee.FirstName.toLowerCase().includes(event.target.value) 
      || employee.LastName.toLowerCase().includes(event.target.value)
      || employee.Position.PositionName.toLowerCase().includes(event.target.value);
    });
  }
}
