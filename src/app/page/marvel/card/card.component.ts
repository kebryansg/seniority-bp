import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MarvelData} from "../../../interfaces/marvel";
import {evtEmit} from "../../../utils/util";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() itemMarvel!: MarvelData
  @Output() clickEvent: EventEmitter<evtEmit> = new EventEmitter<evtEmit>()

  constructor() {
  }

  ngOnInit(): void {
  }

}
