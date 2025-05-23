import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocationsComponent } from './list-locations.component';

describe('ListLocationsComponent', () => {
  let component: ListLocationsComponent;
  let fixture: ComponentFixture<ListLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLocationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
