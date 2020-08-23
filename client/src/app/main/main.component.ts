import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { UserBaseComponent } from '../shared/components/user-base.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends UserBaseComponent implements OnInit, OnDestroy {

  constructor(userService: UserService) {
    super(userService);
  }

  ngOnInit(): void {
    super.OnInit();
  }

  ngOnDestroy(): void {
    super.OnDestroy();
  }
}
