import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GlobalSetting } from './global-setting.model';
import { GlobalSettingPopupService } from './global-setting-popup.service';
import { GlobalSettingService } from './global-setting.service';

@Component({
    selector: 'jhi-global-setting-delete-dialog',
    templateUrl: './global-setting-delete-dialog.component.html'
})
export class GlobalSettingDeleteDialogComponent {

    globalSetting: GlobalSetting;

    constructor(
        private globalSettingService: GlobalSettingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.globalSettingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'globalSettingListModification',
                content: 'Deleted an globalSetting'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-global-setting-delete-popup',
    template: ''
})
export class GlobalSettingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private globalSettingPopupService: GlobalSettingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.globalSettingPopupService
                .open(GlobalSettingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
