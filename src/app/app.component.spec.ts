import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'pool'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pool');
  });

  it('validation method should be defined', () => {
    expect(component.isValidLandscape).toBeDefined();
  });

  describe('landscape validation' , () => {

    it('landscape length should not be greater than 32000', () => {
      const result = component.isValidLandscape(Array(32001));
      expect(result).toEqual(false);
    });
  
    it('landscape length should be less or equal 32000', () => {
      const result = component.isValidLandscape(Array(32000));
      expect(result).toEqual(true);
    });
  
  
    it('max position height should not be greater than 32000', () => {
      const result = component.isValidLandscape([5, 2, 32001]);
      expect(result).toEqual(false);
    });
  
    it('max position height should be less or equal 32000', () => {
      const result = component.isValidLandscape([5, 2, 32000]);
      expect(result).toEqual(true);
    });

    it('every position should be positive number', () => {
      const result = component.isValidLandscape([5, 2, -1]);
      expect(result).toEqual(false);
    });

  });

  describe('calculateWaterAmount', () => {


    it('should return 3 if given [1, 0, 1]', () => {
      const result = component.calculateWaterAmount([1, 0, 1]);
      expect(result).toEqual(1);
    });

    it('should return 3 if given [4, 0, 3]', () => {
      const result = component.calculateWaterAmount([4, 0, 3]);
      expect(result).toEqual(3);
    });

    it('should return 9 if given [5,2,3,4,5,4,0,3,1]', () => {
      const result = component.calculateWaterAmount([5,2,3,4,5,4,0,3,1]);
      expect(result).toEqual(9);
    });


    it('should return 9 if given [1,3,0,4,5,4,3,2,5]', () => {
      const result = component.calculateWaterAmount([1,3,0,4,5,4,3,2,5]);
      expect(result).toEqual(9);
    });

  });


});
