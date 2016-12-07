import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private URL: string = this.env['API'] + ':' + this.env['API_PORT'] + '/';

  constructor(private http: Http, @Inject('config') private env: Object) { }

  /**
   * @param
   * data - Object with login, password and user type
   * @return
   * Response from server
   */
  public login(data): Observable<String[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.URL + 'login', data, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * @param
   * error - Any error response
   * @return
   * Observable.throw with error
   */
  private handleError(error: any) {
    console.log('error occured')
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}