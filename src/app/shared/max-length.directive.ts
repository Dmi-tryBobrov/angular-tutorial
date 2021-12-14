import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function maxLengthValidator(maxLength: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(typeof control.value === "string"){
      return +maxLength < control.value.length ? {maxLength: {value: control.value}} : null;
    }
    else return null;
  }
}

@Directive({
  selector: '[appMaxLength]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxLengthDirective, multi: true}]
})
export class MaxLengthDirective implements Validator{
  
  @Input('appMaxLength') maxLength = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.maxLength ? maxLengthValidator(this.maxLength)(control) : null;
  }

}
