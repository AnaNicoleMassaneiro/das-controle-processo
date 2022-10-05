import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientToProdutComponent } from './view-client-to-produt.component';

describe('ViewClientToProdutComponent', () => {
  let component: ViewClientToProdutComponent;
  let fixture: ComponentFixture<ViewClientToProdutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClientToProdutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientToProdutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
