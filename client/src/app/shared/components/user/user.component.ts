import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/User';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
  private _currentUser: UserModel;
  private $destroy: Subject<boolean> = new Subject<boolean>();

  get currentUser(): UserModel {
    return this._currentUser;
  }

  set currentUser(value: UserModel) {
    this._currentUser = value;
  }

  constructor(private userService: UserService) { }

  ngOnDestroy(): void {
      this.$destroy.next(true);
      this.$destroy.complete();
    }

  ngOnInit(): void {
    this.initCurrentUser();
  }

  private initCurrentUser(): void {
    this.userService.currentUser.pipe(takeUntil(this.$destroy)).subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }

}
