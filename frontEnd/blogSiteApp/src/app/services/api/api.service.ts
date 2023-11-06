import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: String = environment.baseUrl;

  requestMapping:any = {
    'postLogin' : 'users/login',
    'postRegister' : 'users/register',
    'getAllBlogs' : 'blogs',
    'updateBlog' : 'blogs',
    'postBlog' : 'blogs'
  }

  constructor(private http: HttpClient) { }

  getServerData(url:string,params?:any): Observable<any> {

    if(params) {
      return this.http.get(this.returnEndApiUrl(url))
    }else {
      return this.http.get(this.returnEndApiUrl(url),{params})
    }
  } 

  createServerData(url:string,body:any): Observable<any> {

    const headers = { 'content-type': 'application/json'}  
    return this.http.post(this.returnEndApiUrl(url),body,{'headers':headers})
  }

  updateServerData(url:string,body:any): Observable<any> {

    const headers = { 'content-type': 'application/json'}  
    return this.http.put(this.returnEndApiUrl(url),body,{'headers':headers})
  }

  returnEndApiUrl(url:string) {
        return this.baseURL + this.requestMapping[url]
  }
 

}
