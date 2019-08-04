import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventPage } from './list-event.page';

describe('ListEventPage', () => {
  let component: ListEventPage;
  let fixture: ComponentFixture<ListEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
