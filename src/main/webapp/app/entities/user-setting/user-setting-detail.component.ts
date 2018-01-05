import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserSetting } from './user-setting.model';
import { UserSettingService } from './user-setting.service';

@Component({
    selector: 'jhi-user-setting-detail',
    templateUrl: './user-setting-detail.component.html'
})
export class UserSettingDetailComponent implements OnInit, OnDestroy {

    userSetting: UserSetting;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userSettingService: UserSettingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
       // this.userSetting.userSettingValue="nikita";
        this.registerChangeInUserSettings();
    }

    load(id) {
        this.userSettingService.find(id).subscribe((userSetting) => {
            this.userSetting = userSetting;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserSettings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userSettingListModification',
            (response) => this.load(this.userSetting.id)
        );
    }
}
