import { AbstractControl, ValidationErrors } from "@angular/forms";

export class EmpIdValidator{

   static isEmpIdValid(control: AbstractControl): ValidationErrors | null{
        let val : string = control.value

        if(!val){
            return null
        }

        let regExp = /^[A-Z]\d{3}$/;

        let isValid = regExp.test(val)

        if(isValid){
            return null
        }else{
            return {
                inValidEmp : 'Invalid EMP Id (It must start with one alphabate and with 3 numbers, E123)'
            }
        }
     
    }
}