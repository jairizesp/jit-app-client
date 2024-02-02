import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortComponent } from './sort.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortComponent],
      imports: [FontAwesomeModule],
    });

    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
  });

  it('should create SortComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sortUp event on sortAsc method call', () => {
    const sortUpSpy = jest.spyOn(component.sortUp, 'emit');

    component.sortAsc();

    expect(sortUpSpy).toHaveBeenCalled();
  });

  it('should emit sortDown event on sortDesc method call', () => {
    const sortDownSpy = jest.spyOn(component.sortDown, 'emit');

    component.sortDesc();

    expect(sortDownSpy).toHaveBeenCalled();
  });
});
