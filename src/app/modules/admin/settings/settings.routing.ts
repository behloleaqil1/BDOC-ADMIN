import {Route} from '@angular/router';
import {NavigationComponent} from "./navigation/navigation.component";

export const settingsRoutes: Route[] = [
    {
        path: '',
        component: NavigationComponent
    },
    {
        path: 'navigation',
        component: NavigationComponent
    }
];
