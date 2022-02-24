import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee, Office} from "../models";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get('/employees') as Observable<Employee[]>;
  }


  getOffices(): Observable<Office[]> {
    return this.http.get('/offices') as Observable<Office[]>;
  }

  deleteEmployeeById(id: string) {
    return this.http.get(`/employees/${id}`);
  }

  addEmployee(employee: Employee) {
    return this.http.post('/employees/add', employee) as Observable<Employee>;
  }

  updateEmployee(employee: Partial<Employee>) {
    return this.http.patch(`/employees/update`, employee) as Observable<Employee>;
  }

  deleteEmployee(id: string) {
    return this.http.delete(`/employees/${id}`);
  }
}
