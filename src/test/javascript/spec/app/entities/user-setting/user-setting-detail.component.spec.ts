/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JipsterDemoTestModule } from '../../../test.module';
import { UserSettingDetailComponent } from '../../../../../../main/webapp/app/entities/user-setting/user-setting-detail.component';
import { UserSettingService } from '../../../../../../main/webapp/app/entities/user-setting/user-setting.service';
import { UserSetting } from '../../../../../../main/webapp/app/entities/user-setting/user-setting.model';

describe('Component Tests', () => {

    describe('UserSetting Management Detail Component', () => {
        let comp: UserSettingDetailComponent;
        let fixture: ComponentFixture<UserSettingDetailComponent>;
        let service: UserSettingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JipsterDemoTestModule],
                declarations: [UserSettingDetailComponent],
                providers: [
                    UserSettingService
                ]
            })
            .overrideTemplate(UserSettingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSettingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSettingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new UserSetting(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userSetting).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
