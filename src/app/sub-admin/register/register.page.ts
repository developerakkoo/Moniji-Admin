import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loginForm: FormGroup;
  postAdminSub!: Subscription;


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private loadingController: LoadingController) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
    });
   }

  ngOnInit() {
  }

  IonViewDidLeave(){
    this.postAdminSub.unsubscribe();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Creating Sub - Admin',
    });
    await loading.present();
  }
async onSubmit(){
  let obj = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
  }
  this.presentLoading();
    this.postAdminSub = this.http.post(environment.API + `/SubAdmin/signup`, obj).subscribe({
      next:(value:any) =>{
        console.log(value);
        this.loadingController.dismiss();
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();

        
      }
    })
  }

}
