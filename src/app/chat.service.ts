
import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch';

@Injectable()

export class ChatService {

    serviceUrl: string ="https://gateway.watsonplatform.net/conversation/api/v1/workspaces/60f35549-55f2-4ddb-8fc5-efb760f261e9/message?version=2017-05-31";

    constructor(private http: Http, private jsonp: Jsonp) {
    }

    getResponse(text: string): Observable<string> {

        return this.http.get("https://iot-training-dwarika.mybluemix.net/chats", { params: { inputText: text } }).map(response => response.json())
    }

    postQuery(data: string): Observable<string> {
        let options = new URLSearchParams();
        options.append('input', "turn on");
        return this.http.post("https://iot-training-dwarika.mybluemix.net/chats", "").map(response => response.json());
    }

    /******** Experimental Code  Starts ********/

    getMethod(): Observable<any> {
        return this.http.get(this.serviceUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postMethod(postData: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.set('Authorization', 'Basic ' + btoa('df1d73ce-9d69-4437-82fe-83c7bcdc1aa2:R7lWEA6Y3t5z'));
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.serviceUrl, postData , options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    /******** Experimental Code  Ends ********/

}