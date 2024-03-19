import {Component, Input, OnInit} from '@angular/core';
import {CreateEditComponent} from "../create-edit/create-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {Navigation} from "../../../../../core/navigation/navigation.types";

@Component({
    selector: 'app-navigation-expansion-panel',
    templateUrl: './navigation-expansion-panel.component.html',
    styleUrls: ['./navigation-expansion-panel.component.scss']
})
export class NavigationExpansionPanelComponent implements OnInit {
    @Input('navigation') navigation: any;

    constructor(private matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    editNavigation(navigation: Navigation) {
        let dialogRef = this.matDialog.open(CreateEditComponent, {
            height: '400px',
            width: '600px',
            data: navigation
        });
    }
}
