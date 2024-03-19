import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
    @Input('type') type: any;
    @Input('heading') heading: string;
    @Input('description') description: any;

    constructor() {
    }

    ngOnInit(): void {
    }

}
