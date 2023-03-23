import { Component, inject, OnInit } from '@angular/core';
import { Auth, getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private auth: Auth, 
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController,
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
    signInWithEmailAndPassword(this.auth, this.loginForm.value.email, this.loginForm.value.password)
    .then((s) =>{
      console.log(s);
      this.loadingController.dismiss();
      this.router.navigate(['home', s?.user?.uid]);
      
    }).catch((error) =>{
      console.log(error);
      this.loadingController.dismiss();
      this.presentAlert(error.message, "Error");
      
    })

  }
}
