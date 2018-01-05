import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserSettingComponent } from './user-setting.component';
import { UserSettingDetailComponent } from './user-setting-detail.component';
import { UserSettingPopupComponent } from './user-setting-dialog.component';
import { UserSettingDeletePopupComponent } from './user-setting-delete-dialog.component';

@Injectable()
export class UserSettingResolvePagingParams implements Resolve<any> {

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

export const userSettingRoute: Routes = [
    {
        path: 'user-setting',
        component: UserSettingComponent,
        resolve: {
            'pagingParams': UserSettingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.userSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-setting/:id',
        component: UserSettingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.userSetting.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userSettingPopupRoute: Routes = [
    {
        path: 'user-setting-new',
        component: UserSettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.userSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-setting/:id/edit',
        component: UserSettingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.userSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-setting/:id/delete',
        component: UserSettingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jipsterDemoApp.userSetting.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
