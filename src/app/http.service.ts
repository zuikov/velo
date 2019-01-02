import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getData(path){
    return this.http.get(path)
  }

  postData(path, user: User){
    const body = {user};
    return this.http.post(path, body); 
  }

}
