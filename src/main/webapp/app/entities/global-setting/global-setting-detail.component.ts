import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GlobalSetting } from './global-setting.model';
import { GlobalSettingService } from './global-setting.service';

@Component({
    selector: 'jhi-global-setting-detail',
    templateUrl: './global-setting-detail.component.html'
})
export class GlobalSettingDetailComponent implements OnInit, OnDestroy {

    globalSetting: GlobalSetting;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private globalSettingService: GlobalSettingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGlobalSettings();
    }

    load(id) {
        this.globalSettingService.find(id).subscribe((globalSetting) => {
            this.globalSetting = globalSetting;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGlobalSettings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'globalSettingListModification',
            (response) => this.load(this.globalSetting.id)
        );
    }
}
