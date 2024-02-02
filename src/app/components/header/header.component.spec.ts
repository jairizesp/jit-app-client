import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule], // Import RouterTestingModule for testing with Router
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.isLogOutVisible).toBe(false);
  });

  it('should check if the user is logged in', () => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue('fakeToken'),
    };

    // Replace the global localStorage with the mock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    expect(component.isLoggedIn).toBe(true);
  });

  it('should have a default user_info object', () => {
    const defaultUserInfo = {
      id: 0,
      email: '',
      firstName: '',
      lastName: '',
    };

    expect(component.user_info).toEqual(defaultUserInfo);
  });

  // Add more test cases as needed for other methods and functionality

  // Example test for the logout method
  it('should clear localStorage and navigate to login on logout', () => {
    spyOn(localStorage, 'clear');
    spyOn(component.router, 'navigateByUrl');

    component.logout();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(component.isLogOutVisible).toBe(false);
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  // Example test for the showLogOut method
  it('should toggle isLogOutVisible on showLogOut', () => {
    expect(component.isLogOutVisible).toBe(false);

    component.showLogOut();
    expect(component.isLogOutVisible).toBe(true);

    component.showLogOut();
    expect(component.isLogOutVisible).toBe(false);
  });
});
