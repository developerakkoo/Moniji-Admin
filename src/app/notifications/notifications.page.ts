import { environment } from './../../environments/environment';
import { LoadingController, AlertController } from '@ionic/angular';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Database, getDatabase, onChildAdded, ref, set, update } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  userId;
  homeRoute = "";

  userRef:any;
  users:any;

  acceptUserSub!: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private db: Database,
              private http: HttpClient,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private auth: Auth) {
                this.userId = this.route.snapshot.paramMap.get("userId");
                this.homeRoute = `home/${this.userId}`;
                
                // this.userRef = ref(this.db, "Users");
                // onChildAdded(this.userRef, (data) => {
                //   console.log(data.key);
                //   console.log(data.val
                //     ().text);
                  
                  
                //   // addCommentElement(postElement, data.key, data.val().text, data.val().author);
                // });
               }

  ngOnInit() {
    this.http.get(environment.API + "/user")
    .subscribe((res:any) =>{
      this.users = res['user'];
    console.log(this.users);
    console.log(res);
    
      
    }, (error) =>{
      console.log(error);
      
    })
  }



  Accept(user:any){
  
    console.log("Accept");
    this.presentAlertConfirm("Confirm!", "Are you sure to register user?", true, user);

  }

  Reject(user: any){
    console.log("Reject");
    this.presentAlertConfirm("Confirm!", "Are you sure to reject user request?", false, user);

    
  }




  // All Normal Methods


  async presentAlertConfirm(header: string, msg: string, isAccepted: boolean, user: any) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {
            if(isAccepted){
              console.log(user);
              //REgister the user and set isAcceopetd and message
              this.acceptUserSub = this.http.put(environment.API + '/updateUser/status/' + this.userId, {
                userId: user['_id'],
                id: true
              })
              .subscribe((user:any) =>{
                console.log(user);
                
              }, (error:any) =>{
                console.log(error);
                
              })
             
            }
            else if(!isAccepted){
              console.log(user);
              //set isAccepted to false and message to user inputs
              this.acceptUserSub = this.http.put(environment.API + '/updateUser/status/' + this.userId, {
                userId: user['_id'],
                id: false
              })
              .subscribe((user:any) =>{
                console.log(user);
                
              }, (error:any) =>{
                console.log(error);
                
              })
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

}
