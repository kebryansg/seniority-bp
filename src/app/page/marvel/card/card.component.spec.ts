import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.itemMarvel = {
      "_id": "624db8926984eaac6378f037",
      "title": "dasdsa",
      "body": "dsadsa",
      "image": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/005smp_ons_crd_02.jpg",
      "category": "main",
      "idAuthor": "1"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
