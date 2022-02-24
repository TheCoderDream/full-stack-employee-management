import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, OnInit, ViewChild,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import {Employee} from 'src/app/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from "@angular/material/dialog";
import {EmployeeModalComponent} from "../../modals/employee-modal/employee-modal.component";
import {ManagementDataService} from "../../services/management-data.service";
import {map} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {NotificationService} from "../../services/notifiction.service";
import {ConfirmationComponent} from "../../modals/confirmation/confirmation.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['firstName', 'lastName', 'mobile', 'office',  'birthDate', 'tags', 'actions'];
  table: MatTableDataSource<Employee>;
  searchKey: string = '';
  isLoading$ = this.employeeDataService.isLoading$;
  employees$ = this.employeeDataService.employees$
    .pipe(map(employees => {
      const employeesWithKey = employees.map(e => ({$key: e._id, ...e}));
      this.table = new MatTableDataSource(employeesWithKey);
      this.table.sort = this.sort;
      this.table.paginator = this.paginator;
      return this.table;
      })
    );
  noData$ = this.employeeDataService.noData$;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private employeeDataService: ManagementDataService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.employeeDataService.fetchEmployeesAndOffices().subscribe();
  }

  ngAfterViewInit() {
    console.log(this.sort);
    this.table.sort = this.sort;
    this.table.paginator = this.paginator;
  }

  onCreateEmployee() {
    this.dialog.open(EmployeeModalComponent);
  }

  applyFilter() {
    this.table.filter = this.searchKey.trim();
  }

  onSearchClear() {
    this.searchKey = '';
    this.table.filter = this.searchKey;
  }

  onEdit(data: Employee) {
    this.dialog.open(EmployeeModalComponent, {data});
  }

  onDelete(employee: Employee) {
    this.dialog.open(
        ConfirmationComponent,
        {
          data: {
            title: 'Delete employee',
            message: 'Are you sure to delete employee?'
          },
        }
    ).afterClosed().subscribe((val) => {
      if (val) {
        this.employeeDataService.removeEmployee(employee._id)
            .subscribe(
                () => {
                  this.notificationService.success('Successfully removed', 'close');
                },
                () => {
                  this.notificationService.warn('Something went wrong while removing', 'close');
                }
            );
      }
    });
  }
}
