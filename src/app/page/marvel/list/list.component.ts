import {Component, OnInit, ViewChild} from '@angular/core';
import {MarvelService} from "../../../services/marvel.service";
import {Observable, Subject} from "rxjs";
import {startWith, switchMap} from "rxjs/operators";
import {MarvelData, MarvelFormData} from "../../../interfaces/marvel";
import {evtEmit} from "../../../utils/util";
import {EditComponent} from "../edit/edit.component";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sbjItems$: Subject<boolean> = new Subject<boolean>()
  itemsData: MarvelData[]
  showForm: boolean = false

  @ViewChild('editComponent', {static: true}) editComponent: EditComponent

  constructor(private marvelService: MarvelService,
              private authService: AuthService) {
  }

  outLogin() {
    this.authService.outLogin()
    window.location.reload()
  }

  ngOnInit(): void {
    this.sbjItems$.pipe(
      startWith(''),
      switchMap(() => this.marvelService.getItems())
    ).subscribe((res) => this.itemsData = res)

  }

  actions(action: evtEmit, item: MarvelData) {
    let caseAction = {
      'EDIT': () => this.editItem(item),
      'DELETE': () => this.deleteItem(item._id)
    };

    caseAction[action]()

    // Refresh Items
    this.sbjItems$.next()
  }

  editItem(item?: MarvelData) {
    this.showForm = true
    this.editComponent.setData({...item})
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
