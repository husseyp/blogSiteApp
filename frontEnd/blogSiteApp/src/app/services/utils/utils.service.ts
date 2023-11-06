import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

   private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

   get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private toastr: ToastrService,private router:Router) { }


  encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, environment.encryptionKey).toString();
  }

  decrypt(txtToDecrypt: string) {
    return txtToDecrypt ? CryptoJS.AES.decrypt(txtToDecrypt, environment.encryptionKey).toString(CryptoJS.enc.Utf8) : null;
  }

  showSuccess(message:string) {
    this.toastr.success(message, 'Success');
  }

  showError(message:string) {
    this.toastr.error(message, 'Error');
  }

  login() {
      this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.clear()
    this.router.navigate(['/login']);
  }


}
