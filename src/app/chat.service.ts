
import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'

@Injectable()

export class ChatService {

    constructor(private http: Http, private jsonp: Jsonp) {
    }

    getResponse(text:string): Observable<string> {
           
        return this.http.get("https://iot-training-dwarika.mybluemix.net/chats",  {params: { inputText: text }}).map(response => response.json())
    }

    postQuery(data: string): Observable<string> {
        let options = new URLSearchParams();
        options.append('input', "turn on");        
        return this.http.post("https://iot-training-dwarika.mybluemix.net/chats", "").map(response => response.json());
    }
}