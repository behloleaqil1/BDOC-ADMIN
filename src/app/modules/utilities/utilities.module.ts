import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import {FuseAlertModule} from "../../../@fuse/components/alert";



@NgModule({
    declarations: [
        AlertsComponent
    ],
    exports: [
        AlertsComponent
    ],
    imports: [
        CommonModule,
        FuseAlertModule
    ]
})
export class UtilitiesModule { }
