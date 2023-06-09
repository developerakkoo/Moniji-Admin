import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Auth, getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  loginSub!: Subscription;

  constructor(private auth: Auth, 
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private http: HttpClient,
              private fb: FormBuilder) { 
                this.loginForm = this.fb.group({
                  email:[, [Validators.required]],
                  password:[,[Validators.required]]
                })
              }

  ngOnInit() {
  }

  async presentLoading(msg: string) {
    const loading = await this.loadingController.create({
      message: msg,
    });
    await loading.present();
  }


  async presentAlert(msg: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader:'',
      message:msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  login(){
    this.presentLoading("Logging you in...");
    let body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.loginSub = this.http.post(environment.API + "/login", body)
    .subscribe(async (user: any) =>{
      console.log(user);
      this.loadingController.dismiss()
      this.router.navigate(['home', user['postResponse']['userId']])
    }, async (error) =>{
      console.log(error);
      this.loadingController.dismiss();
      this.presentAlert(error.error.messagee, "Error");
    })
   

  }
}
