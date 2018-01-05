import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JipsterDemoGlobalSettingModule } from './global-setting/global-setting.module';
import { JipsterDemoUserSettingModule } from './user-setting/user-setting.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JipsterDemoGlobalSettingModule,
        JipsterDemoUserSettingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JipsterDemoEntityModule {}
