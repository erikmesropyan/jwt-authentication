import { UserModel } from '../models/User';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service';
import { takeUntil } from 'rxjs/operators';

export class UserBaseComponent {
  private _currentUser: UserModel;
  private $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(protected userService: UserService) {
  }

  get currentUser(): UserModel {
    return this._currentUser;
  }

  set currentUser(value: UserModel) {
    this._currentUser = value;
  }

  OnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  OnInit(): void {
    this.initCurrentUser();
  }

  private initCurrentUser(): void {
    this.userService.currentUser.pipe(takeUntil(this.$destroy)).subscribe(user => {
      this.currentUser = user;
    });
  }

}
