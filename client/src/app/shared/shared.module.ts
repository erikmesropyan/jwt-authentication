import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './components/user/user.component';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [
    UserComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserComponent,
    LogoutComponent
  ]
})
export class SharedModule { }
