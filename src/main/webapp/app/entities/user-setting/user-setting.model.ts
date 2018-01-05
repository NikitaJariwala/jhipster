import { BaseEntity } from './../../shared';

export class UserSetting implements BaseEntity {
    constructor(
        public id?: number,
        public userSettingValue?: string,
        public settingName?: BaseEntity,
    ) {
    }
}
