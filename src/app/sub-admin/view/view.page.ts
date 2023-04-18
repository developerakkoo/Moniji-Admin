import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  subAdmin!:any[];
  getSubAdminSub!: Subscription;
  constructor(private http: HttpClient,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllSubAdmins();
  }

  IonViewDidLeave(){
    this.getSubAdminSub.unsubscribe();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
    });
    await loading.present();
  }

  getAllSubAdmins(){
    this.presentLoading();

    this.getSubAdminSub = this.http.get(environment.API + `/subadmin`)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.loadingController.dismiss();
        this.subAdmin = value['sub'];
        
      },

      error: (error) =>{
        console.log(error);
        this.loadingController.dismiss();
        
      }
    })
  }
}
