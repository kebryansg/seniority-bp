import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {debounceTime, filter, map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  register$: Subject<boolean> = new Subject<boolean>()
  messageFail: string
  loadingRegister: boolean = false

  constructor(private fb: FormBuilder,
              private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.buildForm()

    this.register$
      .pipe(
        filter(() => this.registerForm.valid),
        tap(() => this.loadingRegister = true),
        debounceTime(500),
        map(() => this.registerForm.getRawValue()),
        switchMap(({email, password, authorId}) =>
          this.authService.createAccount({email, password, authorid: +authorId})
        )
      )
      .subscribe({
        next: (response) => {
          this.loadingRegister = false
          if (!response.success) {
            this.messageFail = response.message || response.token
            return
          }

          this.clearForm()
        },
      })
  }

  //#region Forms
  get email() {
    return this.registerForm.controls['email'] as FormControl
  }

  get password() {
    return this.registerForm.controls['password'] as FormControl
  }

  get authorId() {
    return this.registerForm.controls['authorId'] as FormControl
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),]],
      password: ['', Validators.required],
      authorId: ['', Validators.required],
    });

    this.registerForm.valueChanges
      .subscribe(() => this.messageFail = null)
  }

  clearForm() {
    this.registerForm.patchValue({
      email: null,
      password: null,
      authorId: null,
    })
  }
  //#endregion


  submitForm() {
    this.register$.next()
  }

}
