import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {UserSetting} from './user-setting.model';
import {UserSettingPopupService} from './user-setting-popup.service';
import {UserSettingService} from './user-setting.service';
import {GlobalSetting, GlobalSettingService} from '../global-setting';
import {User, UserService} from '../../shared';
import {ResponseWrapper} from '../../shared';
import {Principal} from "../../shared/auth/principal.service";

@Component({
    selector: 'jhi-user-setting-dialog',
    templateUrl: './user-setting-dialog.component.html',
    styleUrls: ['./user-setting-dialog.component.css']

})
export class UserSettingDialogComponent implements OnInit {

    currentAccount: any;
    userSetting: UserSetting;
    isSaving: boolean;
    settingValue = [];
    settingvalueArray = [];
    specifiValue: boolean = false;
    anyValue: boolean = false;
    mutipleValue: boolean = false;
    globalsettings: GlobalSetting[];
    globalset: GlobalSetting[];

    checkboxValue: string;
    valueArray = [];
    checkvalue: boolean = false;
    settingNameArray = [];
    users: User[];
    i = 0;
    butDisabled:boolean=false;
    radiovalue:any;
    settinganyValue:any=null;
    userSetting_list:any;

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private userSettingService: UserSettingService,
                private globalSettingService: GlobalSettingService,
                private userService: UserService,
                private eventManager: JhiEventManager,
                private principal: Principal,) {
    }

    ngOnInit() {
        const that = this;
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.isSaving = false;
        this.globalSettingService.query()
            .subscribe((res: ResponseWrapper) => {
                this.globalsettings = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => {
                this.users = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));

        this.userSettingService.query({
        }).subscribe(
            (res: ResponseWrapper) => {this.userSetting_list=res.json

                if(!this.userSetting.id){
                    this.userSetting_list.filter((setting) => {
                        if (this.userSetting_list) {
                            const index = that.globalsettings.findIndex(obj => {
                                return obj.id === setting.settingName.id;
                            });
                            if (index > -1) {
                                this.globalsettings.splice(index, 1);
                            }
                        }
                    });
                }
                else {
                    this.butDisabled=true;
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        if (this.userSetting.settingName && this.userSetting.settingName.settingType == "specific values") {
            this.settingValue = [];
            this.settingValue = this.userSetting.settingName.setting_value.split(",");
            this.specifiValue = true;
            this.anyValue = false;
            this.mutipleValue = false;
            this.settingValue.forEach((setting, index) => {
                that.settingValue[index] = {name: setting};
            });
            this.radiovalue = {name: this.userSetting.userSettingValue};
        }
        if (this.userSetting.settingName && this.userSetting.settingName.settingType == "multiple values") {
            this.settingValue = [];
            this.settingValue = this.userSetting.settingName.setting_value.split(",");
            this.specifiValue = false;
            this.anyValue = false;
            this.mutipleValue = true;
            const selected = this.userSetting.userSettingValue.split(',');
            this.settingValue.forEach((setting, index) => {
                const selectedIndex = selected.indexOf(setting);
                that.settingValue[index] = {name: setting, checked: selectedIndex > -1};
            });
        }
        if (this.userSetting.settingName && this.userSetting.settingName.settingType == "Any Value") {
            this.settingValue = [];

            this.specifiValue = false;
            this.anyValue = true;
            this.mutipleValue = false;
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    selectValue(event) {
        const that = this;
        if (this.userSetting.settingName.settingType == "specific values") {
            this.settingValue = [];
            this.settingValue = this.userSetting.settingName.setting_value.split(",");
            this.specifiValue = true;
            this.anyValue = false;
            this.mutipleValue = false;
            this.settingValue.forEach((setting, index) => {
                that.settingValue[index] = {name: setting};
            });
            this.radiovalue = {name: this.userSetting.userSettingValue};
        }
        if (this.userSetting.settingName.settingType == "multiple values") {
            this.settingValue = [];
            this.settingValue = this.userSetting.settingName.setting_value.split(",");
            this.specifiValue = false;
            this.anyValue = false;
            this.mutipleValue = true;
            this.settingValue.forEach((setting, index) => {
                that.settingValue[index] = {name: setting, checked: false};
            });
        }
        if (this.userSetting.settingName.settingType == "Any Value") {

            this.settingValue = [];
            this.specifiValue = false;
            this.anyValue = true;
            this.mutipleValue = false;
            this.settingValue.forEach((setting, index) => {
                that.settingValue[index] = {name: setting, checked: false};
            });
        }
    }

    newFunction(event, value) {
        console.log(this.checkboxValue);
        this.valueArray.push(value.name);
        this.userSetting.userSettingValue = this.valueArray.toString();

    }

    newFunctionRadio(event, value) {
        this.userSetting.userSettingValue = value.name;
    }

    save() {
        debugger
        if(this.settinganyValue!=null){
            this.userSetting.userSettingValue=this.settinganyValue;
        }
        this.userSetting.userId = this.currentAccount;
        this.isSaving = true;
        if (this.userSetting.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userSettingService.update(this.userSetting));
        } else {
            this.subscribeToSaveResponse(
                this.userSettingService.create(this.userSetting));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserSetting>) {
        result.subscribe((res: UserSetting) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UserSetting) {
        this.eventManager.broadcast({name: 'userSettingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGlobalSettingById(index: number, item: GlobalSetting) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-setting-popup',
    template: ''
})
export class UserSettingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private userSettingPopupService: UserSettingPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.userSettingPopupService
                    .open(UserSettingDialogComponent as Component, params['id']);
            } else {
                this.userSettingPopupService
                    .open(UserSettingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
