import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Role } from './shared/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.userService.initData().subscribe(value => {
      if (value) {
        this.userService.initMe().pipe(take(1)).subscribe(async (user) => {
          const location = window.location.pathname;
          if (location === '/') {
            if (user.role === Role.ADMIN) {
              await this.router.navigateByUrl('/admin');
            } else if (user.role === Role.USER) {
              await this.router.navigateByUrl('/user');
            }
          }
        }, async error => {
          localStorage.clear();
          await this.router.navigateByUrl('/login');
        });
      }
    });
  }

}
