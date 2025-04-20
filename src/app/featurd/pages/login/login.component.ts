import { Component, inject } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FloatLabelModule, InputTextModule, FormsModule,ReactiveFormsModule,PasswordModule,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  private readonly formBuilder =inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly toastrService = inject(ToastrService)
  private readonly router = inject(Router)

  callingApi:boolean = false

  registerForm:FormGroup = this.formBuilder.group({
    email: [null , [Validators.required , Validators.email]],
    password: [null , [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/) ]],
  })


  loginRegisterForm(){
    this.callingApi = true
    if(this.registerForm.valid){

      this.authService.loginApi(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          this.toastrService.success("Login Successfully","Docker")
          localStorage.setItem("NoteToken",res.token)
          setTimeout(()=>{
            this.router.navigate(["/home"])
          },1000)

          this.callingApi = false
        },
        error:(err)=>{
          console.log(err)
          this.callingApi = false
          this.toastrService.error(err.error.msg,"Docker")
        }
      })
    }else{
      this.callingApi = false
      this.registerForm.markAllAsTouched()
    }



  }

}
