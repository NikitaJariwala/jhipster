import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserSetting } from './user-setting.model';
import { UserSettingPopupService } from './user-setting-popup.service';
import { UserSettingService } from './user-setting.service';
import { GlobalSetting, GlobalSettingService } from '../global-setting';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-setting-dialog',
    templateUrl: './user-setting-dialog.component.html',
    styleUrls: ['./user-setting-dialog.component.css']

})
export class UserSettingDialogComponent implements OnInit {

    userSetting: UserSetting;
    isSaving: boolean;
    settingValue=[];
    specifiValue:boolean=false;
    anyValue:boolean=false;
    mutipleValue:boolean=false;
    globalsettings: GlobalSetting[];
    checkboxValue:string;
    valueArray=[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userSettingService: UserSettingService,
        private globalSettingService: GlobalSettingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.globalSettingService.query()
            .subscribe((res: ResponseWrapper) => {this.globalsettings = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
    selectValue(event){
        if(this.userSetting.settingName.settingType=="specific values"){
            this.settingValue=[];
            this.settingValue = this.userSetting.settingName.setting_value.split(",");
            this.specifiValue=true;
            this.anyValue=false;
            this.mutipleValue=false;
        }
        if(this.userSetting.settingName.settingType=="multiple values"){
            this.settingValue=[];

            this.settingValue = this.userSetting.settingName.setting_value.split(",");
            this.specifiValue=false;
            this.anyValue=false;
            this.mutipleValue=true;
        }
        if(this.userSetting.settingName.settingType=="Any Value"){
            this.settingValue=[];

            this.specifiValue=false;
            this.anyValue=true;
            this.mutipleValue=false;
        }

    }

    newFunction(event, value){
        console.log(this.checkboxValue);
        this.valueArray.push(value);
        this.userSetting.userSettingValue=this.valueArray.toString();

    }

    newFunctionRadio(event, value){
        this.userSetting.userSettingValue=value;
    }

    save() {
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
            this.onSaveSuccess(res), (res: Response) => {
            this.onSaveError()});
    }

    private onSaveSuccess(result: UserSetting) {
        this.eventManager.broadcast({ name: 'userSettingListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-user-setting-popup',
    template: ''
})
export class UserSettingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userSettingPopupService: UserSettingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
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
