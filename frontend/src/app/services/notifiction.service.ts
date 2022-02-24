import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    config: MatSnackBarConfig = {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
    };

    success(msg, action) {
        this.config['panelClass'] = ['notification', 'insert'];
        this.snackBar.open(msg, action, this.config);
    }

    reset(msg, action) {
        this.config['panelClass'] = ['notification', 'reset'];
        this.snackBar.open(msg, action, this.config);
    }

    update(msg, action) {
        this.config['panelClass'] = ['notification', 'update'];
        this.snackBar.open(msg, action, this.config);
    }

    warn(msg, action) {
        this.config['panelClass'] = ['notification', 'warn'];
        this.snackBar.open(msg, action, this.config);
    }
}