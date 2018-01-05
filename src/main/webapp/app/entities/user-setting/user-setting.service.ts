import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserSetting } from './user-setting.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserSettingService {

    private resourceUrl =  SERVER_API_URL + 'api/user-settings';

    constructor(private http: Http) { }

    create(userSetting: UserSetting): Observable<UserSetting> {
        const copy = this.convert(userSetting);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userSetting: UserSetting): Observable<UserSetting> {
        const copy = this.convert(userSetting);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UserSetting> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to UserSetting.
     */
    private convertItemFromServer(json: any): UserSetting {
        const entity: UserSetting = Object.assign(new UserSetting(), json);
        return entity;
    }

    /**
     * Convert a UserSetting to a JSON which can be sent to the server.
     */
    private convert(userSetting: UserSetting): UserSetting {
        const copy: UserSetting = Object.assign({}, userSetting);
        return copy;
    }
}
