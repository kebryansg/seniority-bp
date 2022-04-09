import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./page/auth/auth.module').then(module => module.AuthModule),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'marvel',
    loadChildren: () => import('./page/marvel/marvel.module').then(module => module.MarvelModule),
    canActivate: [
      AdminGuard
    ]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
