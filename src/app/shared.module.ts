import {NgModule} from '@angular/core';
import {BtnLoadingDirective} from './directive/btn-loading.directive';

@NgModule({
  declarations: [
    BtnLoadingDirective
  ],
  exports: [
    BtnLoadingDirective
  ]
})
export class SharedModule {
}
