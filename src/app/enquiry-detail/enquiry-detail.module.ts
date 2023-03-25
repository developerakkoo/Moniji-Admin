import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnquiryDetailPageRoutingModule } from './enquiry-detail-routing.module';

import { EnquiryDetailPage } from './enquiry-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnquiryDetailPageRoutingModule
  ],
  declarations: [EnquiryDetailPage]
})
export class EnquiryDetailPageModule {}
