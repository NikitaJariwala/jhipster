/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JipsterDemoTestModule } from '../../../test.module';
import { UserSettingDialogComponent } from '../../../../../../main/webapp/app/entities/user-setting/user-setting-dialog.component';
import { UserSettingService } from '../../../../../../main/webapp/app/entities/user-setting/user-setting.service';
import { UserSetting } from '../../../../../../main/webapp/app/entities/user-setting/user-setting.model';
import { GlobalSettingService } from '../../../../../../main/webapp/app/entities/global-setting';

describe('Component Tests', () => {

    describe('UserSetting Management Dialog Component', () => {
        let comp: UserSettingDialogComponent;
        let fixture: ComponentFixture<UserSettingDialogComponent>;
        let service: UserSettingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JipsterDemoTestModule],
                declarations: [UserSettingDialogComponent],
                providers: [
                    GlobalSettingService,
                    UserSettingService
                ]
            })
            .overrideTemplate(UserSettingDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSettingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSettingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserSetting(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.userSetting = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userSettingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserSetting();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.userSetting = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userSettingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
