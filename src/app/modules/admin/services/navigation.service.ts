import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private httpClient: HttpClient) {
    }

    getAllNavigationList() {
        return this.httpClient.get(environment.CMS_URL + 'navigation');
    }
}
