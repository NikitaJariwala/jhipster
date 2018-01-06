import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JipsterDemoSharedModule } from '../../shared';
import { JipsterDemoAdminModule } from '../../admin/admin.module';
import {
    UserSettingService,
    UserSettingPopupService,
    UserSettingComponent,
    UserSettingDetailComponent,
    UserSettingDialogComponent,
    UserSettingPopupComponent,
    UserSettingDeletePopupComponent,
    UserSettingDeleteDialogComponent,
    userSettingRoute,
    userSettingPopupRoute,
    UserSettingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userSettingRoute,
    ...userSettingPopupRoute,
];

@NgModule({
    imports: [
        JipsterDemoSharedModule,
        JipsterDemoAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserSettingComponent,
        UserSettingDetailComponent,
        UserSettingDialogComponent,
        UserSettingDeleteDialogComponent,
        UserSettingPopupComponent,
        UserSettingDeletePopupComponent,
    ],
    entryComponents: [
        UserSettingComponent,
        UserSettingDialogComponent,
        UserSettingPopupComponent,
        UserSettingDeleteDialogComponent,
        UserSettingDeletePopupComponent,
    ],
    providers: [
        UserSettingService,
        UserSettingPopupService,
        UserSettingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JipsterDemoUserSettingModule {}
