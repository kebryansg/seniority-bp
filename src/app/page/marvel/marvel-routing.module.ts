import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarvelComponent} from "./marvel.component";
import {ListComponent} from "./list/list.component";

const routes: Routes = [
  {
    path: '',
    component: MarvelComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarvelRoutingModule { }
