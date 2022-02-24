import {Component, Inject, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employee} from "../../models";
import {ManagementDataService} from "../../services/management-data.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {NotificationService} from "../../services/notifiction.service";

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  form: FormGroup;
  offices$ = this.managementDataService.offices$;
  constructor(
    private managementDataService: ManagementDataService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private dialogRef: MatDialogRef<EmployeeModalComponent>
  ) {}

  get noData() {
    return this.data === null;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      tags: [this.noData ? [] : this.data.tags],
      firstName: [this.noData ? '' : this.data.firstName , [Validators.required]],
      lastName: [this.noData ? '' : this.data.lastName, [Validators.required] ],
      office: [this.noData ? '' : this.data.office._id, [Validators.required] ],
      phoneNumber: [this.noData ? '' : this.data.phoneNumber,  [Validators.required, Validators.minLength(10)] ],
      birthDate: [this.noData ? '' : this.data.birthDate, [Validators.required] ],
    });
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  async onSubmit() {
    try {
      if (this.noData) {
        await this.managementDataService.addEmployee(this.form.value).toPromise()
      } else {
        await this.managementDataService.updateEmployee({
          ...this.data,
          ...this.form.value
        }).toPromise();
      }
      this.onDialogClose();
      this.notificationService.success('eSuccessfully saved', 'close');
    } catch (error) {
      this.notificationService.warn('Something went wrong while saving data', 'close');
    }
  }

  onClear() {
    this.form.reset()
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this.form.value.tags.includes(value)) {
      this.form.patchValue(
        {
          tags: this.form.value.tags.concat([value])
        }
      );
    }

    event.chipInput!.clear();
  }

  removeTag(tag: string) {
    const tags = this.form.value.tags.filter(t => t !== tag);
    this.form.patchValue(
      {
        tags
      }
    );
  }
}
