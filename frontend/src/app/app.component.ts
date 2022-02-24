import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  AuthenticationService,
} from "src/app/services/authentication/authentication.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    public router: Router,
    private auth: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {}
  title = "Todo";

  clickedLogout() {
    this._snackBar.open("Logging out", "Done", {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "bottom"
    });

    this.auth.logout();
  }
}
