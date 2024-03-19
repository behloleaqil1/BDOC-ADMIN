import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../../../core/navigation/navigation.service";
import {FuseNavigationItem} from "../../../../../@fuse/components/navigation";
import {CreateEditComponent} from "./create-edit/create-edit.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    panelOpenState: Boolean = true;
    navigation: FuseNavigationItem[];

    constructor(private navigationService: NavigationService, private matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getNavigation()
    }

    private getNavigation() {
        this.navigationService.navigation$.subscribe((navigation: any) => {
            this.navigation = navigation;
        })
    }

    addEditNavigation() {
        let dialogRef = this.matDialog.open(CreateEditComponent, {
            height: '400px',
            width: '600px',
        });
    }
}
