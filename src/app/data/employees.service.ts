import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee'
import { EmployeeRaw } from './employeeRaw'
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private url ="https://fathomless-bastion-88087.herokuapp.com/";
  
  constructor(private http: HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url+'employees');
  }
  saveEmployee(employee: EmployeeRaw):Observable<EmployeeRaw>{
    return this.http.put<any>(this.url+'employee/'+employee._id,employee);
  }
  getEmployee(id):Observable<EmployeeRaw[]>{
    return this.http.get<EmployeeRaw[]>(this.url+'employee-raw/'+id);
  }
}
