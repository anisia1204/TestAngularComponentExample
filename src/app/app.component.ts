import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActionModel} from "./action.model";
import {actions} from "./action-list";
import {AppService} from "./app.service";
import {ActionEnabler} from "./action-enabler";
import {ActionSorter} from "./action-sorter";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  standalone: true
})
export class AppComponent implements OnInit{
  appService = inject(AppService)
  actions: ActionModel[] = actions
  statusObject: {status1: boolean, status2: boolean} = {status1: false, status2: false}

  ngOnInit(): void {
    this.appService.getStatuses().subscribe(
      res => this.statusObject = res
    )
  }

  getActions() {
    return ActionSorter.sortActionsByDisabledState(
      this.actions.map(action => {
        return {
          ...action,
          disabled: !ActionEnabler.isEnabled(action, this.statusObject.status1, this.statusObject.status2)
        }
    }))
  }
}
