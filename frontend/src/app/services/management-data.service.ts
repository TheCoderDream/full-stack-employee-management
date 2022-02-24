import {Injectable} from "@angular/core";
import {BehaviorSubject, combineLatest, forkJoin} from "rxjs";
import {Employee, Office} from "../models";
import {EmployeeService} from "./employee.service";
import {finalize, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ManagementDataService {
  private employees: Employee[] = [];
  private offices: Office[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
  private officesSubject = new BehaviorSubject<Office[]>(this.offices);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  employees$ = this.employeesSubject.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();
  offices$ = this.officesSubject.asObservable();
  noData$ = combineLatest([
    this.employees$,
    this.isLoading$
  ]).pipe(map(([employess, isLoading]) => !isLoading && employess.length));

  constructor(private employeesService: EmployeeService) {}

  fetchEmployeesAndOffices() {
    this.isLoadingSubject.next(true);
    return forkJoin([
      this.employeesService.getEmployees(),
      this.employeesService.getOffices()
    ])
      .pipe(
        tap(([employees, offices]) => {
          this.employees = employees;
          this.offices = offices;
          this.employeesSubject.next(this.employees);
          this.officesSubject.next(this.offices)
        }),
        finalize(() => {
          this.isLoadingSubject.next(false);
        })
      );
  }

  addEmployee(employee: Employee) {
    this.isLoadingSubject.next(true);
    return this.employeesService.addEmployee(employee)
      .pipe(
        tap((data) => {
          this.employees = this.employees.concat([data]);
          this.employeesSubject.next(this.employees);
        }),
        finalize(() => {
          this.isLoadingSubject.next(false);
        })
      );
  }

  updateEmployee(employee: Partial<Employee>) {
    this.isLoadingSubject.next(true);
    return this.employeesService.updateEmployee(employee)
      .pipe(
        tap(data => {
          const employeeIndex = this.employees.findIndex(e => e._id === employee._id);
          if (employeeIndex > -1) {
            this.employees[employeeIndex] = data;
          }
          this.employees = this.employees.concat();
          console.log(this.employees);
          this.employeesSubject.next(this.employees);
        }),
        finalize(() => {
          this.isLoadingSubject.next(false);
        })
      );
  }

  removeEmployee(id: string) {
    this.isLoadingSubject.next(true);
    return this.employeesService.deleteEmployee(id)
      .pipe(
        tap(data => {
          const employeeIndex = this.employees.findIndex(e => e._id === id);
          if (employeeIndex > -1) {
            this.employees.splice(employeeIndex, 1);
          }
          this.employees = this.employees.concat();
          this.employeesSubject.next(this.employees);
        }),
        finalize(() => {
          this.isLoadingSubject.next(false);
        })
      );
  }
}
