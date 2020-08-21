import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/User';
import {environment} from '../../../environments/environment';
import {ResponseModel, Status} from '../models/Response';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public static readonly TOKEN = 'access_token';
  private currentUserInformation: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string, remember: boolean): Observable<null> {
    return this.http.post<ResponseModel>(`${environment.url}user/login`, {email, password, remember})
      .pipe(map(this.handleTokenCreation.bind(this)));
  }

  get currentUser(): BehaviorSubject<UserModel> {
    return this.currentUserInformation;
  }

  public initMe(): Observable<any> {
    return this.http.get(`${environment.url}user/me`)
      .pipe(map(this.handleTokenCreation.bind(this)));
  }

  public initData(): Observable<boolean> {
    const token = localStorage.getItem(UserService.TOKEN);
    return new Observable(observer => {
        observer.next(!!token);
      });
  }

  private handleTokenCreation(res: ResponseModel): Observable<null> {
    if (res.status === Status.SUCCESS) {
      this.currentUserInformation.next(res.data.user);
      if (res.token) {
        localStorage.setItem(UserService.TOKEN, res.token);
      }
      return null;
    }
    throw new Error(res.message);
  }
}
