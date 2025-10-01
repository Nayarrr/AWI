import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export class UsernameValidator {
    static cannotContainSpace() : ValidatorFn{
        return (control : AbstractControl) : ValidationErrors | null => {
            const value : string = control.value || ''
            if (value.includes(' ')){
                return{ cannotContainSpace : true }
            }
            return null
        }
    }
}
