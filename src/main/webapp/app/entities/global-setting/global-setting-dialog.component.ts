import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';
import {TagInputModule} from 'ngx-chips';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {GlobalSetting} from './global-setting.model';
import {GlobalSettingPopupService} from './global-setting-popup.service';
import {GlobalSettingService} from './global-setting.service';

@Component({
    selector: 'jhi-global-setting-dialog',
    templateUrl: './global-setting-dialog.component.html'
})
export class GlobalSettingDialogComponent implements OnInit {

    globalSetting: GlobalSetting;
    isSaving: boolean;
    items = [];
    i = 0;
    specifiValue:boolean=false;
    anyValue:boolean=true;
    mutipleValue:boolean=false;

    constructor(public activeModal: NgbActiveModal,
                private globalSettingService: GlobalSettingService,
                private eventManager: JhiEventManager) {

        TagInputModule.withDefaults({
                tagInput: {
                    placeholder:'setting-value',
                // add here other default values for tag-input
            },
            dropdown: {
            displayBy:'my-display-value',
            // add here other default values for tag-input-dropdown
        }
    });
    }

    ngOnInit() {
        this.isSaving = false;
        this.globalSetting.settingType="Any Value";
        this.globalSetting.setting_value="";

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    selectValue(event){
        console.log("event value",event.target.value);
        if(event.target.value=='specific values'){
            this.specifiValue=true;
            this.anyValue=false;
            this.mutipleValue=false;
            this.globalSetting.settingType="specific values";
        }
        if(event.target.value=='multiple values'){
            this.specifiValue=false;
            this.anyValue=false;
            this.mutipleValue=true;
            this.globalSetting.settingType="multiple values";

        }if(event.target.value=='Any Value'){
            this.specifiValue=false;
            this.anyValue=true;
            this.mutipleValue=false;
            this.globalSetting.settingType="Any Value";

        }
    }

    save() {
        this.isSaving = true;
        if (this.globalSetting.id !== undefined) {
            this.subscribeToSaveResponse(
                this.globalSettingService.update(this.globalSetting));
        } else {
            this.subscribeToSaveResponse(
                this.globalSettingService.create(this.globalSetting));
        }
    }

    private subscribeToSaveResponse(result: Observable<GlobalSetting>) {
        result.subscribe((res: GlobalSetting) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: GlobalSetting) {
        this.eventManager.broadcast({name: 'globalSettingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    onItemAdded(event) {
        this.globalSetting.setting_value = this.items[0].display
        for (this.i = 1; this.i < this.items.length; this.i++) {
            this.globalSetting.setting_value = this.globalSetting.setting_value + "," + this.items[this.i].display;
        }
        this.globalSetting.setting_value = this.globalSetting.setting_value.slice(0, this.globalSetting.setting_value.length);
    }
}

@Component({
    selector: 'jhi-global-setting-popup',
    template: ''
})
export class GlobalSettingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private globalSettingPopupService: GlobalSettingPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.globalSettingPopupService
                    .open(GlobalSettingDialogComponent as Component, params['id']);
            } else {
                this.globalSettingPopupService
                    .open(GlobalSettingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
