import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MarvelData, MarvelFormData} from "../../../interfaces/marvel";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup
  edit: boolean = false
  data: MarvelData
  @Output() evtAction: EventEmitter<MarvelFormData> = new EventEmitter<MarvelFormData>()

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  setData(data: MarvelData) {
    this.data = {...data}

    this.editForm.patchValue({
      ...data
    })
  }

  submitForm() {
    const dataForm = this.editForm.getRawValue()
    this.evtAction.emit({
      status: 'save',
      data: {
        ...this.data,
        ...dataForm
      }
    })

    this.editForm.reset({
      title: null,
      body: null,
      category: 'main',
      image: null,
    })
  }

  cancelForm() {
    this.evtAction.emit({
      status: 'cancel'
    })
  }

  //#region Form
  get title() {
    return this.editForm.controls['title'] as FormControl
  }

  get description() {
    return this.editForm.controls['body'] as FormControl
  }

  get image() {
    return this.editForm.controls['image'] as FormControl
  }

  buildForm(): void {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      category: ['main'],
      image: ['', Validators.required],
    })
  }

  //#endregion

}
