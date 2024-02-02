import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../../../services/user/login.service';
import { of, throwError } from 'rxjs';
import { UserInformation } from 'src/app/interface/user/user-information.interface';

describe('LoginComponent - login method', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jest.Mocked<LoginService>;

  beforeEach(() => {
    const loginServiceMock = {
      login: jest.fn(),
    } as unknown as jest.Mocked<LoginService>;

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: LoginService, useValue: loginServiceMock }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jest.Mocked<LoginService>;
  });

  it('should handle successful login', fakeAsync(() => {
    // Arrange
    const mockElement = { textContent: '' };
    const mockResponse = {
      status: 200,
      token: 'mockToken',
      user: {
        id: 1,
        email: 'mock@example.com',
        firstName: 'John',
        lastName: 'Doe',
        username: 'mockUser',
      },
    };

    loginService.login.mockReturnValue(of(mockResponse as UserInformation));
    const routerNavigateByUrlSpy = jest
      .spyOn(component.router, 'navigateByUrl')
      .mockResolvedValue(true);

    // Act
    component.login(mockElement);
    tick(); // Simulate the passage of time

    // Assert
    expect(component.logInDetails).toEqual({
      token: 'mockToken',
      user: {
        id: 1,
        email: 'mock@example.com',
        firstName: 'John',
        lastName: 'Doe',
        username: 'mockUser',
      },
    });

    expect(component.isLoading).toBe(false);
    expect(routerNavigateByUrlSpy).toHaveBeenCalledWith('/home');
  }));

  // Add more test cases as needed for different scenarios
});
