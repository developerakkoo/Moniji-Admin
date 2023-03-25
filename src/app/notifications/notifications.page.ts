import { environment } from './../../environments/environment';
import { LoadingController, AlertController } from '@ionic/angular';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Database, getDatabase, onChildAdded, ref, set, update } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(private router: Router,
              private route: ActivatedRoute,
              private db: Database,
              private http: HttpClient,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private auth: Auth) {
                this.userId = this.route.snapshot.paramMap.get("userId");
                this.homeRoute = `home/${this.userId}`;
                this.db = getDatabase();
                // this.userRef = ref(this.db, "Users");
                // onChildAdded(this.userRef, (data) => {
                //   console.log(data.key);
                //   console.log(data.val
                //     ().text);
                  
                  
                //   // addCommentElement(postElement, data.key, data.val().text, data.val().author);
                // });
               }

  ngOnInit() {
    this.http.get("https://moniji-default-rtdb.firebaseio.com/Users.json/").subscribe((res:any) =>{
      this.users = Object.keys(res).map((key) => { return res[key] });
    console.log(this.users);
    console.log(res);
    
      
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
              console.log("Accpet the user" + user);
              //REgister the user and set isAcceopetd and message
              createUserWithEmailAndPassword(this.auth, user?.email, user?.password)
              .then(async (success) =>{
                console.log(success);
                const postData = {
                  email: user?.email,
                  password: user?.password,
                  address: user?.address,
                  gst: user?.gst,
                  mobile: user?.mobile,
                  key: user?.key,
                  company: user?.company,
                  city: user?.city,
                  isAccepted: true,
                  message: "Your Application is accpeted by Moniji Enterprices!"
                };
                const updates:any = {};
                updates['/Users/' + user?.key + '/'] = postData;
                update(ref(this.db), updates)
                .then((user) =>{
                  console.log(user);
                  
                }).catch((error) =>{
                  console.log(error);
                  
                })
               
                
                
              }).catch((error) =>{

              })
             
            }
            else if(!isAccepted){
              console.log("Reject the user" + user);
              //set isAccepted to false and message to user inputs
              
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

}
