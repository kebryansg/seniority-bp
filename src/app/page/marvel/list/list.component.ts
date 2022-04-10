import {Component, OnInit, ViewChild} from '@angular/core';
import {MarvelService} from "../../../services/marvel.service";
import {Observable, Subject} from "rxjs";
import {debounceTime, startWith, switchMap} from "rxjs/operators";
import {MarvelData, MarvelFormData} from "../../../interfaces/marvel";
import {evtEmit} from "../../../utils/util";
import {EditComponent} from "../edit/edit.component";
import {AuthService} from "../../../services/auth.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sbjItems$: Subject<string> = new Subject<string>()
  itemsData: MarvelData[]
  showForm: boolean = false
  txtSearch: FormControl

  @ViewChild('editComponent', {static: true}) editComponent: EditComponent

  constructor(private marvelService: MarvelService,
              private authService: AuthService) {
  }

  outLogin() {
    this.authService.outLogin()
    window.location.reload()
  }

  ngOnInit(): void {
    this.initSearch()

    this.sbjItems$.pipe(
      startWith(''),
      switchMap((text) => this.marvelService.getItemsByTitle(text || ''))
    ).subscribe((res) => this.itemsData = res)
  }

  initSearch() {
    this.txtSearch = new FormControl([''])
    this.txtSearch.valueChanges
      .pipe(
        debounceTime(500),
      ).subscribe(text => this.sbjItems$.next(text))
  }

  actions(action: evtEmit, item: MarvelData) {
    let caseAction = {
      'EDIT': () => this.editItem(item),
      'DELETE': () => this.deleteItem(item._id)
    };

    caseAction[action]()
  }

  editItem(item?: MarvelData) {
    this.showForm = true
    this.editComponent.setData({...item})

    setTimeout(() =>
      document.getElementById("formEdit")
        .scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        }), 500);
  }

  evtForm(evt: MarvelFormData) {
    if (evt.status == 'save') {
      const {data} = evt
      const edit = '_id' in data
      let obs$: Observable<any>
      obs$ = (edit) ?
        this.marvelService.update(data._id, data)
        :
        this.marvelService.create(data)

      obs$.subscribe({
        next: () => this.sbjItems$.next()
      })
    }
    this.showForm = false
  }

  deleteItem(idItem: string) {
    this.marvelService.delete(idItem)
      .subscribe({
        next: () => {
        }
      })
  }

}
