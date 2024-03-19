import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Navigation} from 'app/core/navigation/navigation.types';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>(environment.CMS_URL + 'navigation').pipe(
            tap((navigation: any) => {
                this._navigation.next(navigation.body);
            })
        );
    }

    updateNavigation(data: any, uuid: string) {
        return this._httpClient.put<Navigation>(environment.CMS_URL + 'navigation?uuid=' + uuid, {
            ...data
        }).pipe(
            tap((navigation: any) => {
                    this._navigation.next(navigation.body);
                }
            )
        );
    }

    createNavigation(data: any) {
        return this._httpClient.post<Navigation>(environment.CMS_URL + 'navigation', {
            ...data
        }).pipe(
            tap((navigation: any) => {
                    this._navigation.next(navigation.body);
                }
            )
        );
    }
}
