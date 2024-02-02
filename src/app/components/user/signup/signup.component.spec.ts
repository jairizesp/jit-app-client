import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { SignupService } from '../../../services/user/signup.service';
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signupService: jest.Mocked<SignupService>;

  beforeEach(() => {
    const signupServiceMock = {
      signup: jest.fn(),
    } as unknown as jest.Mocked<SignupService>;

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [{ provide: SignupService, useValue: signupServiceMock }],
    });

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    signupService = TestBed.inject(SignupService) as jest.Mocked<SignupService>;
  });

  it('should create SignupComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call signup service on signup', () => {
    // Arrange
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.email = 'john.doe@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';

    const mockResponse = { status: 200 };

    signupService.signup.mockReturnValue(of(mockResponse));

    component.signup();

    expect(signupService.signup).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
  });

  it('should handle successful signup', () => {
    const mockResponse = { status: 200 };

    signupService.signup.mockReturnValue(of(mockResponse));

    component.signup();

    expect(component.firstName).toBe('');
    expect(component.lastName).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
  });

  it('should handle signup failure', () => {
    const mockErrorResponse = { status: 400 };

    signupService.signup.mockReturnValue(throwError(mockErrorResponse));

    component.signup();
  });
});
