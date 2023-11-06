import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.utilsService.isLoggedIn;
  }

  userLogout() {
    this.utilsService.logout();
  }
}
