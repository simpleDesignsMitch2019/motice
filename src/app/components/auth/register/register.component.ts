import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor( public authService: AuthService, public router: Router ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name'  : new FormControl('', [Validators.required]),
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'passw' : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      'confi' : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
    });
  }

  attemptRegister() {
    this.authService.RegisterWithEmail(this.registerForm.controls['email'].value, this.registerForm.controls['passw'].value).then((user:User) => {
      this.authService.UpdateUserData({
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: this.registerForm.controls['name'].value,
        photoURL: user.photoURL
      }).then(() => {
        this.router.navigateByUrl('/auth/verify');
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

}
