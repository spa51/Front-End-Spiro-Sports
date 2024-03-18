import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategorysComponent } from './edit-categorys.component';

describe('EditCategorysComponent', () => {
  let component: EditCategorysComponent;
  let fixture: ComponentFixture<EditCategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategorysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
