import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  title = 'pool';
  amountWater = 0;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.form = this.getForm();
  }

  getWaterAmount() {
    const value = Array.from(String(this.form.controls['landscape'].value), Number);
    this.amountWater = this.calculateWaterAmount(value);
  }


  calculateWaterAmount(landscape: number[]) {
        /**
          we have to define high edges.
          for this we can use two pointers.
          each pointer is shifted to their intersection
          subtracting the current value of the position from the value of 
          the maximum value and adding this value to the sum

          O(N)
        */

        let amountWater = 0,

        left = 0, 
        right = landscape.length - 1,
        maxLeft = 0,
        maxRight = 0;

        while(left < right) {
          if (landscape[left] > maxLeft) maxLeft = landscape[left];
          if (landscape[right] > maxRight) maxRight = landscape[right];

          if (maxLeft > maxRight) {
            amountWater += maxRight - landscape[right];
            right--;
          } else {
            amountWater += maxLeft - landscape[left];
            left++
          }

        }

        return amountWater;
        
      

  }

  isValidLandscape(landscape: number[]): boolean {
    return landscape.length <= 32000 && 
      landscape.every((position) => position >=0 && position <= 32000);
  }

  private getForm(): FormGroup {
    const validatorLandscape: Function = (): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors => {
            return this.isValidLandscape(Array.from(String(control.value), Number)) ? [] : { notValid: true };
        };
    };

    return this.fb.group({
        landscape: ['', [Validators.required, validatorLandscape()]],
    });
}
}
