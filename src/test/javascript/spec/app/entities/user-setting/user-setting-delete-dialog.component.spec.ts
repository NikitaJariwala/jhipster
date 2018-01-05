/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JipsterDemoTestModule } from '../../../test.module';
import { UserSettingDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-setting/user-setting-delete-dialog.component';
import { UserSettingService } from '../../../../../../main/webapp/app/entities/user-setting/user-setting.service';

describe('Component Tests', () => {

    describe('UserSetting Management Delete Component', () => {
        let comp: UserSettingDeleteDialogComponent;
        let fixture: ComponentFixture<UserSettingDeleteDialogComponent>;
        let service: UserSettingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JipsterDemoTestModule],
                declarations: [UserSettingDeleteDialogComponent],
                providers: [
                    UserSettingService
                ]
            })
            .overrideTemplate(UserSettingDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSettingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSettingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
