import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './const/validators/validationPatterns';
import { NoSpaceBarValidator } from './const/validators/noSpaceBar';
import { EmpIdValidator } from './const/validators/empIdvalidators';
import { Icountry } from './models/country';
import { COUNTRIES_META_DATA } from './const/country/countries';
import { RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ReactiveForm';
  signUpForm !: FormGroup;

  gendersArr : Array<string> =['male', 'female', 'others']

  CountryData : Array<Icountry> = COUNTRIES_META_DATA
  constructor(){
  }

  ngOnInit(): void {
    this.CreatSignUpForm();
    console.log(this.signUpForm);
    this.OnSkillAdd()
    this.CheckBoxHandler();
    this.PatchValueHandler()
   
  }
  PatchValueHandler(){
    this.f['isAddSame'].valueChanges
        .subscribe((res:Boolean) =>{
          console.log(res);
          
          if(res === true){
             let currentAdressDAta = this.f['currentAddress'].value
             this.f['permanentAddress'].patchValue(currentAdressDAta)
             this.f['permanentAddress'].disable()

          }else{
            this.f['permanentAddress'].reset()
            this.f['permanentAddress'].enable()
          }
        })
  }

  CheckBoxHandler(){
      this.f['currentAddress'].valueChanges
        .subscribe(res =>{
          console.log( 'is valid', this.f['currentAddress'].valid);
          if(this.f['currentAddress'].valid){
            this.f['isAddSame'].enable()
          }else{
             this.f['isAddSame'].disable()
          }
          
        })
  }


  CreatSignUpForm(){
     this.signUpForm = new FormGroup({
      userName : new FormControl (null, [
         Validators.required,
         Validators.minLength(6), 
         Validators.maxLength(12), 
         Validators.pattern(CustomRegex.username),
         NoSpaceBarValidator.noSpace]),
         
      email : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)]),
      empId: new FormControl(null, [Validators.required, EmpIdValidator.isEmpIdValid]),
      gender : new FormControl('female'),

      currentAddress : new FormGroup({
      city : new FormControl (null, [Validators.required]),
      state : new FormControl (null, [Validators.required]),
      country : new FormControl ("India", [Validators.required]),
      pincode : new FormControl (null, [Validators.required]),
    }),
     permanentAddress : new FormGroup({
      city : new FormControl (null, [Validators.required]),
      state : new FormControl (null, [Validators.required]),
      country : new FormControl (null, [Validators.required]),
      pincode : new FormControl (null, [Validators.required]),
    }),
    isAddSame : new FormControl({value : false, disabled :true}),
    skills : new FormArray([]),
    dependents : new FormArray([]),
    password : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
    Confirmpassword : new FormControl({value:null, disabled:true}, [Validators.required])

    })

  }

  addDependents(){
    let dependentgroup = new FormGroup({
        fullName : new FormControl (null, [Validators.required]),
        relationship : new FormControl (null, [Validators.required]),
        citizenship : new FormControl (null, [Validators.required]),
        IstravlingWithu : new FormControl (null, [Validators.required])

    })
    this.dependentsArr.push(dependentgroup)
  }


onSignUp(){
  console.log(this.signUpForm);
  if(this.signUpForm.valid){
     console.log(this.signUpForm.value);
     this.signUpForm.reset();
  }
  
}



OnSkillAdd(){
     if(this.skillsArr.length < 5){
      let skillControl = new FormControl(null, [Validators.required])

        this.skillsArr.push(skillControl)
         
     }
}

OnSkillRemove(i : number){
  this.skillsArr.removeAt(i)
   
} 
 

onDependentRemove(i :number){
  this.dependentsArr.removeAt(i)
}

get f(){
  return this.signUpForm.controls
}
 public get userName(){
  return this.signUpForm.get('userName') as FormControl
}

get skillsArr(){
  return this.f['skills'] as FormArray
}

get dependentsArr(){
  return this.f['dependents'] as FormArray
}



}
