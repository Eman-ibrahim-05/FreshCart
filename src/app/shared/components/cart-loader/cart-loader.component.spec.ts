import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLoaderComponent } from './cart-loader.component';

describe('CartLoaderComponent', () => {
  let component: CartLoaderComponent;
  let fixture: ComponentFixture<CartLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
