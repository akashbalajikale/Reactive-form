import { AbstractControl, ValidationErrors } from "@angular/forms";
import { __values } from "tslib";

export class NoSpaceBarValidator{

   static noSpace(control : AbstractControl): ValidationErrors | null {
        let val = control.value as string
        if(!val){
            return null
        }
        if(val.includes(' ')){
            return {
                npSpaceBar : ' space is not allowed'
            }
        }else{
            return null
        }
    }
}