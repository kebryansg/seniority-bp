import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {HttpClientModule} from "@angular/common/http";
import {MarvelService} from "../../../services/marvel.service";
import {AuthService} from "../../../services/auth.service";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers:[MarvelService, AuthService],
      imports:[HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
