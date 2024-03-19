import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {settingsRoutes} from "./settings.routing";
import {RouterModule} from "@angular/router";
import {ECommerceModule} from "../apps/ecommerce/ecommerce.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSortModule} from "@angular/material/sort";
import {MatExpansionModule} from "@angular/material/expansion";
import {
    NavigationExpansionPanelComponent
} from './navigation/navigation-expansion-panel/navigation-expansion-panel.component';
import {MatDividerModule} from "@angular/material/divider";
import {CreateEditComponent} from './navigation/create-edit/create-edit.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {FuseAlertModule} from "../../../../@fuse/components/alert";
import {UtilitiesModule} from "../../utilities/utilities.module";


@NgModule({
    declarations: [
        NavigationComponent,
        NavigationExpansionPanelComponent,
        CreateEditComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(settingsRoutes),
        FormsModule,
        ReactiveFormsModule,
        ECommerceModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSortModule,
        MatExpansionModule,
        MatDividerModule,
        MatGridListModule,
        FuseAlertModule,
        UtilitiesModule
    ],
    entryComponents: [
        CreateEditComponent
    ]
})
export class SettingsModule {
}
