import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
declare var $ : any;
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            $('#repeatPass').tooltip('dispose')
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
            $('#repeatPass').tooltip('show');
        } else {
            matchingControl.setErrors(null);
            $('#repeatPass').tooltip('dispose')
        }
    }
}

    
