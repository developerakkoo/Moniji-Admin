import { LoadingController, AlertController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Database, object, list, listVal, objectVal, getDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userId;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private auth: Auth,
              private db: Database) {
                this.userId = this.route.snapshot.paramMap.get('userId');
                console.log(`UserID in Home:- ${this.userId}`);

                this.auth.onAuthStateChanged((f) =>{
                  console.log(f?.uid);
                  
                })

                
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

              openNotifications(){
              
              }

}
