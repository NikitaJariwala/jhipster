/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JipsterDemoTestModule } from '../../../test.module';
import { GlobalSettingDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/global-setting/global-setting-delete-dialog.component';
import { GlobalSettingService } from '../../../../../../main/webapp/app/entities/global-setting/global-setting.service';

describe('Component Tests', () => {

    describe('GlobalSetting Management Delete Component', () => {
        let comp: GlobalSettingDeleteDialogComponent;
        let fixture: ComponentFixture<GlobalSettingDeleteDialogComponent>;
        let service: GlobalSettingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JipsterDemoTestModule],
                declarations: [GlobalSettingDeleteDialogComponent],
                providers: [
                    GlobalSettingService
                ]
            })
            .overrideTemplate(GlobalSettingDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GlobalSettingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GlobalSettingService);
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
