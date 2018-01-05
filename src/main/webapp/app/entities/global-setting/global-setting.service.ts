import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GlobalSetting } from './global-setting.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GlobalSettingService {

    private resourceUrl =  SERVER_API_URL + 'api/global-settings';

    constructor(private http: Http) { }

    create(globalSetting: GlobalSetting): Observable<GlobalSetting> {
        const copy = this.convert(globalSetting);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(globalSetting: GlobalSetting): Observable<GlobalSetting> {
        const copy = this.convert(globalSetting);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<GlobalSetting> {
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
     * Convert a returned JSON object to GlobalSetting.
     */
    private convertItemFromServer(json: any): GlobalSetting {
        const entity: GlobalSetting = Object.assign(new GlobalSetting(), json);
        return entity;
    }

    /**
     * Convert a GlobalSetting to a JSON which can be sent to the server.
     */
    private convert(globalSetting: GlobalSetting): GlobalSetting {
        const copy: GlobalSetting = Object.assign({}, globalSetting);
        return copy;
    }
}
