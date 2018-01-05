/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JipsterDemoTestModule } from '../../../test.module';
import { GlobalSettingDetailComponent } from '../../../../../../main/webapp/app/entities/global-setting/global-setting-detail.component';
import { GlobalSettingService } from '../../../../../../main/webapp/app/entities/global-setting/global-setting.service';
import { GlobalSetting } from '../../../../../../main/webapp/app/entities/global-setting/global-setting.model';

describe('Component Tests', () => {

    describe('GlobalSetting Management Detail Component', () => {
        let comp: GlobalSettingDetailComponent;
        let fixture: ComponentFixture<GlobalSettingDetailComponent>;
        let service: GlobalSettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JipsterDemoTestModule],
                declarations: [GlobalSettingDetailComponent],
                providers: [
                    GlobalSettingService
                ]
            })
            .overrideTemplate(GlobalSettingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GlobalSettingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GlobalSettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new GlobalSetting(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.globalSetting).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
