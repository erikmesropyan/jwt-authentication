import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '../shared/models/User';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { UserBaseComponent } from '../shared/components/user-base.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent extends UserBaseComponent implements OnInit, OnDestroy {
  public $allUsers: Observable<Array<UserModel>>;

  constructor(userService: UserService) {
    super(userService);
  }

  ngOnInit(): void {
    super.OnInit();
    this.$allUsers = this.userService.getAllUsers();
  }

  ngOnDestroy(): void {
    super.OnDestroy();
  }
}
