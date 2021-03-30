import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy{
  isAuth = false;
  @Output() closeSidenav = new EventEmitter<void>();
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  close() {
    this.closeSidenav.emit();
  }

  onLogout(){
    this.close();
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
