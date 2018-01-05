import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GlobalSettingComponent } from './global-setting.component';
import { GlobalSettingDetailComponent } from './global-setting-detail.component';
import { GlobalSettingPopupComponent } from './global-setting-dialog.component';
import { GlobalSettingDeletePopupComponent } from './global-setting-delete-dialog.component';

@Injectable()
export class GlobalSettingResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const globalSettingRoute: Routes = [
    {
        path: 'global-setting',
        component: GlobalSettingComponent,
        resolve: {
            'pagingParams': GlobalSettingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'global-setting/:id',
        component: GlobalSettingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const globalSettingPopupRoute: Routes = [
    {
        path: 'global-setting-new',
        component: GlobalSettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'global-setting/:id/edit',
        component: GlobalSettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'global-setting/:id/delete',
        component: GlobalSettingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.globalSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
