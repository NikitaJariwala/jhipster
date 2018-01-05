import { BaseEntity } from './../../shared';

export class GlobalSetting implements BaseEntity {
    constructor(
        public id?: number,
        public setting_name?: string,
        public setting_value?: string,
        public settingType?: string,
    ) {
    }
}
