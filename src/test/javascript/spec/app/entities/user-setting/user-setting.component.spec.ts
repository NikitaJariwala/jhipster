/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JipsterDemoTestModule } from '../../../test.module';
import { UserSettingComponent } from '../../../../../../main/webapp/app/entities/user-setting/user-setting.component';
import { UserSettingService } from '../../../../../../main/webapp/app/entities/user-setting/user-setting.service';
import { UserSetting } from '../../../../../../main/webapp/app/entities/user-setting/user-setting.model';

describe('Component Tests', () => {

    describe('UserSetting Management Component', () => {
        let comp: UserSettingComponent;
        let fixture: ComponentFixture<UserSettingComponent>;
        let service: UserSettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JipsterDemoTestModule],
                declarations: [UserSettingComponent],
                providers: [
                    UserSettingService
                ]
            })
            .overrideTemplate(UserSettingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSettingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new UserSetting(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userSettings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
