import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserSetting } from './user-setting.model';
import { UserSettingPopupService } from './user-setting-popup.service';
import { UserSettingService } from './user-setting.service';

@Component({
    selector: 'jhi-user-setting-delete-dialog',
    templateUrl: './user-setting-delete-dialog.component.html'
})
export class UserSettingDeleteDialogComponent {

    userSetting: UserSetting;

    constructor(
        private userSettingService: UserSettingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userSettingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userSettingListModification',
                content: 'Deleted an userSetting'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-setting-delete-popup',
    template: ''
})
export class UserSettingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userSettingPopupService: UserSettingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userSettingPopupService
                .open(UserSettingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
