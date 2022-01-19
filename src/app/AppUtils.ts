import { FormGroup, Validators } from "@angular/forms";

export class AppUtils {


    public static validarForm(listaCampo = [], form: FormGroup): void {
        listaCampo.forEach((e) => {
            form.get(e).setValidators([Validators.required]);
            form.get(e).markAsTouched();
        });
    }


}