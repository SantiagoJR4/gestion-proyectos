import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports:[
    FormsModule,
    ReactiveFormsModule,
    //Modulos de PrimeNg
    NgIf,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule
  ]
})
export class LoginComponent implements OnInit {
  
  //Variable para manejar el error si la autenticación falla
  error:string = '';

  loginForm: FormGroup = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('',[Validators.required])
  })

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.valid){
      const {username, password} = this.loginForm.value;
      if(this.authService.login(username,password)){
        this.router.navigate(['/projects']);
      }else{
        this.error = 'Credenciales Erroneas';
      }
    }
  }

  validInput(field:string){
    return this.loginForm.get(field)?.invalid
      && this.loginForm.get(field)?.touched
  }

}
