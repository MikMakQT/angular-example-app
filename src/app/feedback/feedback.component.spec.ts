import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { FeedbackComponent } from './feedback.component';
import { HomeComponent } from '../home/home.component';
import { FormControl, Validators } from '@angular/forms';
//import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  let router: Router;
  let routerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackComponent, BrowserAnimationsModule],
      providers: [
        provideRouter([{ path: 'home', component: HomeComponent }]),
        provideLocationMocks(),
      ],
      /*schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]*/
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel navigates to homepage', () => {
    component.cancel();

    expect(routerSpy).toHaveBeenCalledWith(['home']);
  });

  it('should mark name as invalid when it contains special characters', () => {
    const nameControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]*$/), // Only allow alphanumeric and spaces
    ]);

    nameControl.setValue('John@Doe');

    expect(nameControl.invalid).toBeTrue();
    expect(nameControl.errors?.['pattern']).toBeTruthy();
  });

  it('should mark name as valid when it has value', () => {
    const nameControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]*$/), // Only allow alphanumeric and spaces
    ]);

    nameControl.setValue('John Doe');

    expect(nameControl.valid).toBeTrue();
    expect(nameControl.errors).toBeNull();
  });

  it('should mark name as invalid when it has no value', () => {
    const nameControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]*$/), // Only allow alphanumeric and spaces
    ]);

    nameControl.setValue('');

    expect(nameControl.invalid).toBeTrue();
    expect(nameControl.errors?.['required']).toBeTruthy();
  });

  it('should mark name as invalid when it only has one character', () => {
    const nameControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]*$/), // Only alphanumeric and spaces
      Validators.minLength(2), // Must be at least 2 characters long
    ]);

    nameControl.setValue('A');

    expect(nameControl.invalid).toBeTrue();
    expect(nameControl.errors?.['minlength']).toBeTruthy();
  });

  it('should mark name as valid when it has two characters', () => {
    const nameControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]*$/), // Only alphanumeric and spaces
      Validators.minLength(2), // Must be at least 2 characters
    ]);

    nameControl.setValue('Al');

    expect(nameControl.valid).toBeTrue();
    expect(nameControl.errors).toBeNull();
  });
});
