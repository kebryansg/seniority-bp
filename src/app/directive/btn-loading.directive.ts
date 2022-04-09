import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[loading]'
})
export class BtnLoadingDirective implements OnInit, OnChanges {

  textInit!: string
  @Input() loading: boolean = false

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnChanges(changes): void {
    this.loading = changes.loading?.currentValue;
    if (this.loading) {
      this.elementRef.nativeElement.innerHTML = '<div class="spinner" aria-hidden="true"></div>';
    } else {
      if (this.textInit) {
        this.elementRef.nativeElement.innerText = this.textInit;
      }
    }
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', this.loading);
  }

  ngOnInit() {
    this.textInit = this.elementRef.nativeElement.innerHTML;
    // this.renderer.addClass(this.elementRef.nativeElement, 'btn-outline-success');
    // this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', this.textInput);
  }

}
