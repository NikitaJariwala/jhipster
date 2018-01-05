import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {RlTagInputModule} from 'angular2-tag-input';
import { TagInputModule } from 'ngx-chips';
import { JipsterDemoSharedModule } from '../../shared';
import {
    GlobalSettingService,
    GlobalSettingPopupService,
    GlobalSettingComponent,
    GlobalSettingDetailComponent,
    GlobalSettingDialogComponent,
    GlobalSettingPopupComponent,
    GlobalSettingDeletePopupComponent,
    GlobalSettingDeleteDialogComponent,
    globalSettingRoute,
    globalSettingPopupRoute,
    GlobalSettingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...globalSettingRoute,
    ...globalSettingPopupRoute,
];

@NgModule({
    imports: [
        JipsterDemoSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        TagInputModule,
        BrowserAnimationsModule
    ],
    declarations: [
        GlobalSettingComponent,
        GlobalSettingDetailComponent,
        GlobalSettingDialogComponent,
        GlobalSettingDeleteDialogComponent,
        GlobalSettingPopupComponent,
        GlobalSettingDeletePopupComponent,
    ],
    entryComponents: [
        GlobalSettingComponent,
        GlobalSettingDialogComponent,
        GlobalSettingPopupComponent,
        GlobalSettingDeleteDialogComponent,
        GlobalSettingDeletePopupComponent,
    ],
    providers: [
        GlobalSettingService,
        GlobalSettingPopupService,
        GlobalSettingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JipsterDemoGlobalSettingModule {}
