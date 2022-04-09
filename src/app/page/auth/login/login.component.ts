import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Subject} from "rxjs";
import {debounceTime, filter, map, switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {LOCAL_KEYS} from "../../../utils/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;
  login$: Subject<boolean> = new Subject<boolean>()
  messageFail: string
  loadingForm: boolean = false

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.buildForm();

    this.login$
      .pipe(
        filter(() => this.authForm.valid),
        tap(() => this.loadingForm = true),
        debounceTime(500),
        map(() => this.authForm.getRawValue()),
        switchMap(({email, password}) => this.authService.login({email, password}))
      )
      .subscribe({
        next: (response) => {
          this.loadingForm = false
          if (!response.success) {
            this.messageFail = response.message || response.token
            return
          }

          localStorage.setItem(LOCAL_KEYS.AuthorId, response.data.authorid.toString())
          localStorage.setItem(LOCAL_KEYS.JWT, response.data.jwt)
          this.router.navigate(['..', 'marvel'])
        },
      })
  }

  //#region Forms

  get email() {
    return this.authForm.controls['email'] as FormControl
  }

  get password() {
    return this.authForm.controls['password'] as FormControl
  }

  buildForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),]],
      password: ['', Validators.required],
    });

    this.authForm.valueChanges
      .subscribe(() => this.messageFail = null)
  }

  //#endregion

  submitForm() {
    this.login$.next()
  }

}
