import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MarvelRoutingModule} from './marvel-routing.module';
import {MarvelComponent} from './marvel.component';
import {ListComponent} from './list/list.component';
import {CardComponent} from './card/card.component';
import { EditComponent } from './edit/edit.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MarvelComponent,
    ListComponent,
    CardComponent,
    EditComponent
  ],
    imports: [
        CommonModule,
        MarvelRoutingModule,
        ReactiveFormsModule
    ],
})
export class MarvelModule {
}
