import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user$ = this.userService.currentProfile$;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    // this.authService.currentUser$.subscribe(user => alert('from auth'+JSON.stringify(user)));
    // this.user$.subscribe( user => alert('from user'+JSON.stringify(user)) );
  }

  onLogout(){
    this.authService.logout().subscribe(()=> {
      this.router.navigate(['']);
      console.log('logged out')
    });
  }

}
