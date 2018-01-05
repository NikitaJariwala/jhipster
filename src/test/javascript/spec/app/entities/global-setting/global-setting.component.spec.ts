/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JipsterDemoTestModule } from '../../../test.module';
import { GlobalSettingComponent } from '../../../../../../main/webapp/app/entities/global-setting/global-setting.component';
import { GlobalSettingService } from '../../../../../../main/webapp/app/entities/global-setting/global-setting.service';
import { GlobalSetting } from '../../../../../../main/webapp/app/entities/global-setting/global-setting.model';

describe('Component Tests', () => {

    describe('GlobalSetting Management Component', () => {
        let comp: GlobalSettingComponent;
        let fixture: ComponentFixture<GlobalSettingComponent>;
        let service: GlobalSettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JipsterDemoTestModule],
                declarations: [GlobalSettingComponent],
                providers: [
                    GlobalSettingService
                ]
            })
            .overrideTemplate(GlobalSettingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GlobalSettingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GlobalSettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new GlobalSetting(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.globalSettings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
