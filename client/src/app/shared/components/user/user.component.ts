import { Component, Input } from '@angular/core';
import {UserModel} from '../../models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  private _user: UserModel;

  get user(): UserModel {
    return this._user;
  }

  @Input()
  set user(value: UserModel) {
    this._user = value;
  }

  constructor() { }
}
